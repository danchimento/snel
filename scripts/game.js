var gameSize = 400;
            var score = 0;
            var newGameMessage = "Touch the Square to Begin.";
            var gameOverMessage = "Game Over";
            var message = "";
            var isGameOver = false;
            var taragetSize = 30;
            var targetX = gameSize / 2;
            var targetY = gameSize / 2;
            var startingGameDelay = 2500;
            var delay = startingGameDelay;
            var startingGamePadding = 10;
            var gamePadding = startingGamePadding;
            var gameOverDelay = 2000;
            var gameDelaySpeed = 50;
            var gameShrinkSpeed = 2;
            var timerSize = gameSize;
            var timerIntervalSpeed = 10;

            var element = document.getElementsByTagName('html')[0];
            var gameBoard = document.getElementById('game');
            var scoreLabel = document.getElementById('score-label');
            var target = document.getElementById('target');
            var messageLabel = document.getElementById('message-label');
            var timer = document.getElementById('timer');
            targetTimeout = null;
            timerInterval = null;

            this.px = (value) => `${value}px`;
            this.rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;

            init = function() {

                element.style.height = '100%';

                document.body.style.height = '100%';
                document.body.style.backgroundColor = '#333';
                document.body.style.display = 'flex';
                document.body.style.flexDirection = 'column';
                document.body.style.alignItems = 'center'
                document.body.style.justifyContent = 'center'

                game.style.width = game.style.height = px(gameSize);
                game.style.position = 'absolute';
                game.style.backgroundColor = 'lightgrey';
                game.style.backgroundImage = "url('images/background.png')";
                game.style.backgroundPosition = 'center';
                game.style.backgroundSize = 'cover';

                target.style.position = 'absolute';
                target.style.width = target.style.height = px(taragetSize);
                target.style.backgroundColor = 'red';
                targetX = gameSize / 2;
                targetY = gameSize / 2;
                target.onmousedown = () => hitTarget();

                scoreLabel.style.padding = px(10);
                scoreLabel.style.fontFamily = 'retro';

                messageLabel.style.position = 'absolute';
                messageLabel.style.textAlign = 'center';
                messageLabel.style.width = px(gameSize);
                messageLabel.style.top = px(gameSize / 2 + taragetSize + 20);
                messageLabel.style.fontFamily = 'retro';

                timer.style.position = 'absolute';
                timer.style.height = px(3);
                timer.style.width = px(gameSize);
                timer.style.backgroundColor = 'red';
                timer.style.top = px(gameSize - 3);
                timerSize = gameSize;

                message = newGameMessage;
                isGameOver = false;
                score = 0;
                delay = startingGameDelay;
                gamePadding = startingGamePadding;

                draw();
            }

            draw = function() {
                messageLabel.innerText = message;
                scoreLabel.innerText = score.toString().padStart(3, '0');
                target.style.left = px(targetX - taragetSize / 2);
                target.style.top = px(targetY - taragetSize / 2);
            }

            gameOver = function() {
                isGameOver = true;
                message = gameOverMessage;
                canStartGame = false;
                setTimeout(() => init(), gameOverDelay);
                clearInterval(timerInterval);

                draw();
            }

            resetTime = function() {

                timerSize = gameSize;
                timer.style.width = px(timerSize);

                clearTimeout(targetTimeout);
                targetTimeout = setTimeout(() => {
                    this.gameOver();
                }, delay);

                clearInterval(timerInterval);
                timerInterval = setInterval(() => {
                    var timerShrink = gameSize / delay * timerIntervalSpeed;
                    timerSize -= timerShrink;

                    timer.style.width = px(timerSize);
                }, timerIntervalSpeed);
            }

            hitTarget = function() {

                if (isGameOver) {
                    return;x
                }

                message = "";

                score++;
                delay -= gameDelaySpeed;
                gamePadding += gameShrinkSpeed;

                targetX = rand(gamePadding, gameSize - ((taragetSize / 2) + gamePadding));
                targetY = rand(gamePadding, gameSize - ((taragetSize / 2) + gamePadding));

                resetTime();

                draw();
            }

            this.init();