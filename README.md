# paws-and-preferences
Assessment Project for Netizen Experience, built with vanilla HTML, CSS, and JavaScript.

# Contents

# The Project
Paws and Preferences is a web application that helps discover what kinds of cats or kittens a user prefers. It is a single-page web application where users go through a set of cat images, and uses swipes to indicate preference for a particular image. Once the entire stack of cats have been gone through, a summary is shown for the user's session.

# Technical Decisions
For this project, I chose to use vanilla HTML, CSS and JavaScript because no build steps are needed. Since GitHub Pages serve static files directly, introducing a framework like React or Vue would require a bundler and a build pipeline setup, which adds unnecessary complexity for a project of this scope. Doing this without a framework also allows anyone to simply open the source and read it immediately, without prior knowledge to any specific framework.

Direct DOM manipulation also gives precise control over swipe animations, avoiding any overhead that framework render cycles might introduce.
