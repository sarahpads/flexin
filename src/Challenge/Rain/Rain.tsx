import React, { useRef, useEffect } from "react";
import tweens from "tween-functions";

import * as S from "./Rain.styled";

interface RainProps {
  height: number;
  width: number;
}

export function randomRange(min: number, max: number) {
  return min + (Math.random() * (max - min))
}

const Rain: React.FC<RainProps> = ({ height, width }) => {
  const canvas = useRef<HTMLCanvasElement>() as React.RefObject<HTMLCanvasElement>;
  const raindrops = useRef<Raindrop[]>([]);
  const numRaindrops = 25;
  const initTime = useRef(Date.now());

  useEffect(() => {
    if (!height || !width) {
      return;
    }

    requestAnimationFrame(animate)
  }, [height, width])

  function animate() {
    const ctx = canvas.current?.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, width, height);
    const drops: Raindrop[] = [...raindrops.current];
    const now = Date.now();

    const progressTime = now - initTime.current > 5000
      ? 5000
      : Math.max(0, now - initTime.current)
    const tweenedVal = tweens.easeInOutQuad(progressTime, drops.length, numRaindrops, 5000)
    const numToAdd = Math.round(tweenedVal - drops.length)

    while (drops.length < numToAdd) {
      const x = randomRange(0, width);
      const raindrop = new Raindrop(ctx, x, height);

      drops.push(raindrop)
    }

    for (let i = 0, len = drops.length; i < len; i++) {
      const drop = drops[i];
      drop.update()

      if (drop.y > height || drop.x > width) {
        const x = randomRange(0, width)
        drops[i] = new Raindrop(ctx, x, height);
      }
    }

    raindrops.current = drops;
    requestAnimationFrame(animate);
  }

  return (
    <S.Canvas
      ref={canvas}
      height={height}
      width={width}
      />
  )
}

export default Rain;

class Raindrop {
  public ctx: any;
  public x: number;
  public y: number;
  public size: number;
  public velocity: number;

  constructor(ctx: any, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = -50;
    this.size = randomRange(0.03, 0.07);
    this.velocity = randomRange(3, 4);
  }

  update() {
    this.y += this.velocity;

    this.ctx.save();
    this.ctx.translate(this.x, this.y)
    this.ctx.scale(this.size, this.size)

    const light = new Path2D("M381.347,161.376c-3.541-6.743-6.601-12.567-8.116-15.938c-4.768-10.598-27.465-46.614-47.618-75.564 C281.917,7.11,268.519,1.058,257.624,0.105c-14.367-1.255-31.547,8.221-68.694,58.553c-21.794,29.53-42.536,62.858-50.987,79.225 l-3.617,6.996c-29.283,56.593-59.562,115.113-59.562,185.888c0,99.933,81.301,181.233,181.234,181.233 c48.654,0,94.352-18.985,128.675-53.459c34.103-34.253,52.769-79.659,52.559-127.856 C436.957,267.24,400.781,198.374,381.347,161.376z");
    this.ctx.fillStyle = "#A2D8F4";
    this.ctx.closePath();
    this.ctx.fill(light)

    let dark = new Path2D("M381.328,161.372c-3.541-6.743-6.601-12.567-8.116-15.938c-4.768-10.598-27.465-46.614-47.618-75.564 C281.9,7.106,268.502,1.054,257.607,0.101l-1.626,511.896c48.654,0,94.352-18.985,128.675-53.459 c34.103-34.253,52.769-79.659,52.559-127.856C436.938,267.237,400.762,198.371,381.328,161.372z");
    this.ctx.fillStyle = "#7CC8F0";
    this.ctx.closePath();
    this.ctx.fill(dark)

    this.ctx.restore();
  }
}