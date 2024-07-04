import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const ContinuousSnowfall = () => {
    const [recycle, setRecycle] = useState(true);

    // To create a continuous effect, toggle the `recycle` prop
    useEffect(() => {
        const interval = setInterval(() => {
            setRecycle(prevRecycle => !prevRecycle);
        }, 9000); // Adjust the interval to your preference

        return () => clearInterval(interval);
    }, []);
    const drawSnowflake = (ctx) => {
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, 2 * Math.PI); // Adjust the radius to make particles smaller
        ctx.fill();
        ctx.closePath();
    };

    return (
        <Confetti
        recycle={recycle}
        numberOfPieces={200} // Adjust the number of pieces to your preference
        gravity={0.1} // Adjust gravity to make it look like snowfall
        colors={['#FFFFFF']} // Snowfall color
        drawShape={drawSnowflake} // Custom shape function
        initialVelocityY={1} // Slow down the fall speed
    />
    );
};

export default ContinuousSnowfall;
