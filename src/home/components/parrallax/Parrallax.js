import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, motionValue } from 'framer-motion';
import throttle from 'lodash.throttle';


import './Parrallax.css';

const Parrallax = () => {

    const ref = useRef(null);

    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });


/*
    // Create a throttled MotionValue
    const throttledProgress = motionValue(0);

    // Throttle function to update `throttledProgress`
    const updateThrottledProgress = throttle((latestProgress) => {
        throttledProgress.set(latestProgress);
    }, 10); // Adjust the timing as needed

    // Update `throttledProgress` whenever `scrollYProgress` changes
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(updateThrottledProgress);
        return () => unsubscribe(); // Cleanup
    }, [scrollYProgress]);

    // Use throttled motion value in transforms
    const Layer5Y = useTransform(throttledProgress, [0, 1], ['0%', '100%']);
    const Layer4Y = useTransform(throttledProgress, [0, 1], ['0%', '75%']);
    const Layer3Y = useTransform(throttledProgress, [0, 1], ['0%', '50%']);
    const Layer2Y = useTransform(throttledProgress, [0, 1], ['0%', '25%']);
    const Layer1Y = useTransform(throttledProgress, [0, 1], ['0%', '0%']);
    const textY = useTransform(throttledProgress, [0, 1], ['0%', '120%']);
    */
    const Layer5Y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const Layer4Y = useTransform(scrollYProgress, [0, 1], ['0%', '75%']);
    const Layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const Layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const Layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '0%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '120%']);

    return(
        <>  
            <div className="parrallax-container"
                ref={ref}
            >
            
                <div className="parrallax-content">

                    <motion.h1 className='parrallax-text'
                        style={{y:textY}}
                    >OurOutdoors</motion.h1>


                    {/*
                    <motion.div className="parrallax-image parrallax-layer6"
                    ></motion.div>
                    */}

                    
                    <motion.div className="parrallax-image parrallax-layer5"
                        style={{backgroundImage:'/assets/parrallax/Layer5--.png',
                                y:Layer5Y
                        }}
                    ></motion.div>

                    
                    <motion.div className="parrallax-image parrallax-layer4"
                        style={{backgroundImage:'/assets/parrallax/Layer4--.png',
                            y:Layer4Y

                        }}
                    ></motion.div>

                    
                    <motion.div className="parrallax-image parrallax-layer3"
                        style={{backgroundImage:'/assets/parrallax/Layer3--.png',
                            y:Layer3Y

                        }}
                    ></motion.div>

                    
                    <motion.div className="parrallax-image parrallax-layer2"                    
                        style={{backgroundImage:'/assets/parrallax/Layer2--.png',
                            y:Layer2Y

                        }}
                    ></motion.div>

                    
                    <motion.div className="parrallax-image parrallax-layer1"
                        style={{backgroundImage:'/assets/parrallax/Layer1--.png',
                            y:Layer1Y

                        }}
                    ></motion.div>
                
                </div>
            </div>  

        </>
    )
}

export default Parrallax;