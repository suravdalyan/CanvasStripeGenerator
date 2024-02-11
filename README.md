# Canvas Stripe Generator

## Introduction

This project is a simple web application that allows users to generate stripe patterns
on a canvas element using HTML, CSS, and JavaScript.

## Overview

The canvas stripe generator provides a user-friendly interface for creating stripe
patterns with customizable gap parameter with default black and white combination.
Users can adjust these parameters using sliders to visualize and generate their desired
stripe pattern in real-time.

## Features
- Dynamic Stripe Generation: Users can dynamically adjust the stripe gap size,
- Random first black pixel: The first black pixel in the first row of each canvas will start
  at a random position between 0 and the gap defined with the slider,
- Real-time Preview: Changes to the parameters are immediately reflected in the canvas, allowing
  users to preview the stripe pattern in real-time,
- Responsive Design: The web application is designed to be responsive and compatible with various
  screen sizes starting at 500px and devices.

## Technologies Used
- HTML5: Markup language for creating the structure of the web application,
- CSS3: Stylesheets for styling the user interface and layout,
- JavaScript: Programming language for implementing interactive functionality and canvas manipulation,
- Canvas API: HTML5 canvas element and its JavaScript API for drawing graphics and animations,
- Web Worker: A JavaScript feature that allows to run JavaScript code on a separate thread from the main
  browser UI thread, without blocking or slowing down the user interface of a web page.

## Usage
1. Download the zip file,
2. Extract the zip,
3. Serve your files from a web server: This is the recommended approach, especially for development.
 Set up a local web server using tools like Node.js with `http-server`, or any other web server
 (I have used WebStorm built-in web server), By serving your files over http:// or https://,
 you'll avoid the security restrictions associated with file:// URLs.
4. Adjust the parameters using the provided control (sliders),
5. Preview the generated stripe pattern on the canvas.