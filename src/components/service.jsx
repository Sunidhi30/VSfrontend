import React from 'react';
import './service.css'; // Import the CSS file for styling

const HowItWorks = () => {
    const steps = [
        {
            title: "Step 1: Registration",
            description: "Voters register online by providing necessary details and verifying their identity.",
        },
        {
            title: "Step 2: Voting Process",
            description: "Once registered, voters can cast their votes securely through the platform using their unique credentials.",
        },
        {
            title: "Step 3: Real-Time Results",
            description: "Votes are counted in real-time, ensuring transparency and quick results for the election.",
        },
        {
            title: "Step 4: Secure and Anonymous",
            description: "The voting process is designed to maintain the privacy of voters and ensure that their choices remain confidential.",
        },
    ];

    return (
        <div className="how-it-works" id="how-it-works">
            <h2 className="section-title">How It Works</h2>
            <div className="steps-container">
                {steps.map((step, index) => (
                    <div className="step" key={index}>
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-description">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
