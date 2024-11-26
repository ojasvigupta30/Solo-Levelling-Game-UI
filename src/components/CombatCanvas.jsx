import React, { useRef, useEffect } from 'react';

const CombatCanvas = ({ playerHealth, monsterHealth, triggerSkillEffect, isPlayerAttacking, battleResult }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;

    // Draw the combat scene
    drawScene(ctx, playerHealth, monsterHealth);

    // Add attack animations
    if (triggerSkillEffect) {
      animateAttack(ctx, isPlayerAttacking ? 100 : 500, 200);
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

  const drawScene = (ctx, playerHealth, monsterHealth) => {
    // Clear the canvas
    ctx.clearRect(0, 0, 600, 400);

    // Background
    ctx.fillStyle = '#1c1f26';
    ctx.fillRect(0, 0, 600, 400);

    // Draw Player
    drawCharacter(ctx, 50, 150, 'blue', playerHealth, 'Player');

    // Draw Monster
    drawCharacter(ctx, 450, 150, 'red', monsterHealth, 'Monster');
  };

  const drawCharacter = (ctx, x, y, color, health, label) => {
    // Draw body
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 50, 100);

    // Draw health bar
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y - 20, (health / 100) * 50, 10);

    // Draw label
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(label, x, y - 30);
  };

  const animateAttack = (ctx, x, y) => {
    // Create attack flash
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.fill();
    ctx.closePath();

    setTimeout(() => {
      ctx.clearRect(x - 40, y - 40, 80, 80); // Clear attack flash
    }, 300);
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
        ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity})`;
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

  const hexToRgb = (hex) => {
    const rgb = {
      red: parseInt(hex.slice(1, 3), 16),
      green: parseInt(hex.slice(3, 5), 16),
      blue: parseInt(hex.slice(5, 7), 16),
    };
    return `${rgb.red}, ${rgb.green}, ${rgb.blue}`;
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
