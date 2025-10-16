import React from 'react';
import '../styles/community.css';

export default function Community() {
    return (
        <div className="community-page">
            <header>
                <h1>Welcome to the Community Page</h1>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/community">Community</a></li>
                        <li><a href="/lifeAfterSports">Life After Sports</a></li>
                        <li><a href="/wellnessTools">Wellness Tools</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <section className="intro">
                    <h2>Join Our Community</h2>
                    <p>Connect with like-minded individuals and share your experiences.</p>
                </section>
                <section className="forums">
                    <h2>Discussion Forums</h2>
                    <p>Engage in conversations on various topics related to mental health and wellness.</p>
                </section>
            </main>
            <footer>
                <p>&copy; 2023 Mental Health App. All rights reserved.</p>
            </footer>
        </div>
    );
}