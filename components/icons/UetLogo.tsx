
import React from 'react';

export const UetLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 200 200"
        {...props}
    >
        {/* Background & Borders */}
        <circle cx="100" cy="100" r="100" fill="#ffffff"/>
        <circle cx="100" cy="100" r="98" fill="none" stroke="#add8e6" strokeWidth="4"/>
        <circle cx="100" cy="100" r="92" fill="none" stroke="#333333" strokeWidth="2"/>
        
        {/* Text */}
        <defs>
            <path id="uetTextPath" d="M 28,100 a 72,72 0 1,1 144,0" fill="none" />
        </defs>
        <text fill="#333333" style={{ fontSize: '15px', fontWeight: 'bold', letterSpacing: '2.5px' }}>
            <textPath href="#uetTextPath" startOffset="50%" textAnchor="middle">
                UNIVERSITY OF ENGINEERING AND TECHNOLOGY
            </textPath>
        </text>
        <text x="100" y="170" textAnchor="middle" fill="#333333" style={{ fontSize: '16px', fontWeight: 'bold' }}>
            <tspan>• TAXILA •</tspan>
        </text>

        {/* Central Graphic */}
        <g clipPath="url(#innerCircleClip)">
            {/* Water */}
            <g>
                <rect x="35" y="105" width="130" height="60" fill="#2d7dae"/>
                <path d="M35 115 c 20 -10, 40 10, 65 0 s 45 10, 65 0" stroke="white" strokeWidth="4" fill="none"/>
                <path d="M35 125 c 20 -10, 40 10, 65 0 s 45 10, 65 0" stroke="white" strokeWidth="4" fill="none"/>
                <path d="M35 135 c 20 -10, 40 10, 65 0 s 45 10, 65 0" stroke="white" strokeWidth="4" fill="none"/>
            </g>

            {/* Yellow Background */}
            <circle cx="100" cy="100" r="55" fill="#fbb912"/>

            {/* Arrows */}
            <g transform="translate(100,100)" stroke="white" strokeWidth="5" fill="none">
                 <path d="M 0, -52 A 52,52 0 0 1 45, -26" />
                 <path d="M 45, 26 A 52,52 0 0 1 -45, 26" />
                 <path d="M -45,-26 A 52,52 0 0 1 0,-52" />
            </g>
             <g fill="white" transform="translate(100,100)">
                <polygon points="0,-42 10,-52 0,-62" transform="rotate(30)"/>
                <polygon points="0,-42 10,-52 0,-62" transform="rotate(150)"/>
                <polygon points="0,-42 10,-52 0,-62" transform="rotate(270)"/>
            </g>

            {/* Gear */}
            <g id="gear" transform="translate(100, 100) scale(0.35)">
                <path d="M0-42l5.4 3.1c1.6 0.9 2.9 2.2 3.9 3.9l3.1 5.4c1.4 2.4 3.6 4.2 6.3 4.9l6.1 1.7c2.7 0.7 5 2.3 6.3 4.9l3.1 5.4 c1.6 2.8 1.6 6.2 0 9l-3.1 5.4c-1.3 2.6-3.6 4.2-6.3 4.9l-6.1 1.7c-2.7 0.7-5 2.3-6.3 4.9l-3.1 5.4c-1.6 2.8-4.5 4.5-7.6 4.5 c-3.1 0-6-1.7-7.6-4.5l-3.1-5.4c-1.3-2.6-3.6-4.2-6.3-4.9l-6.1-1.7c-2.7-0.7-5-2.3-6.3-4.9l-3.1-5.4c-1.6-2.8-1.6-6.2 0-9 l3.1-5.4c1.3-2.6 3.6-4.2 6.3-4.9l6.1-1.7c2.7-0.7 5-2.3 6.3-4.9l3.1-5.4C40.6-37.5 45.2-40 50-40 C54.8-40 59.4-37.5 62.5-33.4z" transform="scale(0.85)" fill="#808285"/>
                <circle cx="0" cy="0" r="10" fill="white" />
                <circle cx="0" cy="0" r="5" fill="#fbb912"/>
            </g>
        </g>
        
        {/* Clipping path for the inner circle */}
        <defs>
            <clipPath id="innerCircleClip">
                <circle cx="100" cy="100" r="85"/>
            </clipPath>
        </defs>
    </svg>
);
