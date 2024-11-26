import React, { useRef, useEffect } from 'react';

const CombatCanvas = ({ playerHealth, monsterHealth, triggerSkillEffect, isPlayerAttacking, battleResult }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;

    const playerImg = new Image();
    const monsterImg = new Image();

    // Load player and monster images
    playerImg.src = '/assets/Player.png';
    monsterImg.src = '/assets/monster.png';

    // Once images are loaded, draw the scene
    playerImg.onload = () => {
      monsterImg.onload = () => {
        drawScene(ctx, playerHealth, monsterHealth, playerImg, monsterImg);
      };
    };

    // Add attack animations
    if (triggerSkillEffect) {
      animateAttack(ctx, isPlayerAttacking, playerImg, monsterImg);
    }

    // Add victory/loss effects
    if (battleResult) {
      if (battleResult.includes('Victory')) {
        drawFireworks(ctx);
      } else if (battleResult.includes('Defeat')) {
        drawFadeOut(ctx);
      }
    }
  }, [playerHealth, monsterHealth, triggerSkillEffect, isPlayerAttacking, battleResult]);

  const drawScene = (ctx, playerHealth, monsterHealth, playerImg, monsterImg) => {
    // Clear the canvas
    ctx.clearRect(0, 0, 600, 400);

    // Background
    ctx.fillStyle = '#1c1f26';
    ctx.fillRect(0, 0, 600, 400);

    // Draw Player
    drawCharacter(ctx, 50, 150, playerImg, playerHealth, 'Player');

    // Draw Monster
    drawCharacter(ctx, 450, 150, monsterImg, monsterHealth, 'Monster');
  };

  const drawCharacter = (ctx, x, y, img, health, label) => {
    // Draw character image
    ctx.drawImage(img, x, y, 80, 120);

    // Draw health bar
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y - 20, (health / 100) * 80, 10);

    // Draw label
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(label, x + 20, y - 30);
  };

  const animateAttack = (ctx, isPlayerAttacking, playerImg, monsterImg) => {
    let animationFrame;
    const attackDuration = 500; // 500ms
    const startTime = performance.now();
    const initialX = isPlayerAttacking ? 50 : 450;
    const targetX = isPlayerAttacking ? 300 : 200; // Move closer to opponent
    const attackColor = isPlayerAttacking ? 'rgba(0, 150, 255, 0.7)' : 'rgba(255, 50, 50, 0.7)';

    const animate = (time) => {
      const elapsed = time - startTime;

      if (elapsed < attackDuration) {
        const progress = elapsed / attackDuration;

        // Calculate interpolated position for the attacker
        const currentX = initialX + (targetX - initialX) * progress;

        // Clear the canvas
        ctx.clearRect(0, 0, 600, 400);

        // Background
        ctx.fillStyle = '#1c1f26';
        ctx.fillRect(0, 0, 600, 400);

        // Draw Attacker and Defender
        if (isPlayerAttacking) {
          drawCharacter(ctx, currentX, 150, playerImg, playerHealth, 'Player'); // Player moves
          drawCharacter(ctx, 450, 150, monsterImg, monsterHealth, 'Monster'); // Monster stays still
        } else {
          drawCharacter(ctx, 50, 150, playerImg, playerHealth, 'Player'); // Player stays still
          drawCharacter(ctx, currentX, 150, monsterImg, monsterHealth, 'Monster'); // Monster moves
        }

        // Draw attack flash at target
        ctx.beginPath();
        ctx.arc(targetX + 30, 200, 30, 0, Math.PI * 2);
        ctx.fillStyle = attackColor;
        ctx.fill();
        ctx.closePath();

        // Request next frame
        animationFrame = requestAnimationFrame(animate);
      } else {
        // End animation and redraw the static scene
        cancelAnimationFrame(animationFrame);
        drawScene(ctx, playerHealth, monsterHealth, playerImg, monsterImg);
      }
    };

    animationFrame = requestAnimationFrame(animate);
  };

  const drawFireworks = (ctx) => {
    const particles = [];
    const colors = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * 600, // Random x-coordinate
        y: Math.random() * 400, // Random y-coordinate
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocityX: Math.random() * 4 - 2,
        velocityY: Math.random() * 4 - 2,
        opacity: 1,
      });
    }

    // Animation loop
    const animateParticles = () => {
      ctx.clearRect(0, 0, 600, 400);

      // Redraw background
      ctx.fillStyle = '#1c1f26';
      ctx.fillRect(0, 0, 600, 400);

      // Update and draw each particle
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        // Reduce opacity for fading effect
        particle.opacity -= 0.02;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.fill();
        ctx.closePath();
      });

      // Continue animation if particles are still visible
      if (particles.some((particle) => particle.opacity > 0)) {
        requestAnimationFrame(animateParticles);
      }
    };

    animateParticles();
  };

  const drawFadeOut = (ctx) => {
    let opacity = 0;
    const interval = setInterval(() => {
      if (opacity >= 1) {
        clearInterval(interval);
        return;
      }

      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.fillRect(0, 0, 600, 400);

      opacity += 0.05;
    }, 100);
  };

  return <canvas ref={canvasRef} style={{ border: '1px solid #ffffff' }}></canvas>;
};

export default CombatCanvas;
