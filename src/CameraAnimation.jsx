import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber' // For managing Three.js camera and animation
import { gsap } from 'gsap' // GSAP animation library
import { ScrollTrigger } from 'gsap/ScrollTrigger' // ScrollTrigger plugin for scroll-based animations
import { useGSAP } from '@gsap/react' // Custom hook for integrating GSAP in React
import * as THREE from 'three' // Importing Three.js utilities

// Registering the GSAP plugins so they can be used in the animation
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP)

// Define the initial target point where the camera will be looking
const cameraTarget = new THREE.Vector3(0, -0.5, 0)

export default function CameraAnimation() {
  const tl = gsap.timeline() // Create a GSAP timeline that will hold the animation sequences

  // Get the Three.js camera object from the fiber context
  const camera = useThree((state) => state.camera)

  // On every frame, update the camera's rotation to look at the defined target
  useFrame((state, delta) => {
    camera.lookAt(cameraTarget)
  })

  // GSAP animations (using the `useGSAP` hook to manage animation)
  useGSAP(
    () => {
      // Section 1 -> Section 2 animation: Camera moves as you scroll
      tl.fromTo(
        camera.position, // Starting from the initial camera position
        { x: 0, y: 1, z: 4 }, // Initial position
        {
          x: 2.56, // End position in the X axis
          y: -1.01, // End position in the Y axis
          z: 2, // End position in the Z axis
          ease: 'power1.inOut', // Smooth easing for the animation
          scrollTrigger: {
            trigger: '.section-2', // The element that triggers the animation
            start: 'top bottom', // When the top of the section reaches the bottom of the viewport
            end: 'bottom bottom', // When the bottom of the section reaches the bottom of the viewport
            scrub: 0.5 // Sync animation with scroll position
          }
        }
      )

      // Section 1 -> Section 2 animation: Camera target changes position (looking at a different spot)
      tl.fromTo(
        cameraTarget, // Starting from the initial camera target
        {
          x: 0, // Starting X position
          y: -0.5, // Starting Y position
          z: 0 // Starting Z position
        },
        {
          x: -4, // Move the camera target to the left (X axis)
          y: 0, // Keep Y unchanged
          z: 0, // Keep Z unchanged
          ease: 'power1.inOut', // Smooth easing for the animation
          scrollTrigger: {
            trigger: '.section-2', // Trigger animation when section-2 comes into view
            start: 'top bottom', // Start when the section reaches the bottom of the viewport
            end: 'bottom bottom', // End when the bottom of the section reaches the bottom of the viewport
            scrub: 0.5 // Sync the animation with scroll
          }
        },
        '<' // Maintain the timing of this animation to match the previous one
      )

      // Fade out the wrapper of Section 1 as the user scrolls through Section 2
      tl.to(
        '.section-1 .wrapper',
        {
          // opacity: 0, // Fade out the opacity
          // yPercent: 100,
          scrollTrigger: {
            trigger: '.section-2', // The animation is triggered by Section-2
            start: 'top bottom', // Start fading when Section-2 comes into view
            end: 'top 70%', // End the fade-out when Section-2 has scrolled to 70% of the viewport
            scrub: 0.5 // Sync animation with scroll position
          }
        },
        '<' // Keep this animation in sync with the previous ones
      )

      // Section 2 -> Section 3 animation: Camera moves to a new position
      tl.fromTo(
        camera.position, // From the position at the end of Section-2
        { x: 2.56, y: -1.01, z: 2 }, // Starting position (end of Section-2)
        {
          x: 0, // Move the camera to the center on the X axis
          y: -1.01, // Keep the Y position the same
          z: 5, // Move the camera further away along the Z axis
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-3', // Trigger animation when Section-3 comes into view
            start: 'top bottom', // Start when the top of Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when the bottom of Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync animation with scroll position
          }
        }
      )

      // Section 2 -> Section 3 animation: Change camera target to look in a different direction
      tl.fromTo(
        cameraTarget, // Starting from the target position of Section-2
        { x: -4, y: 0, z: 0 }, // Starting target position
        {
          x: 4, // Move the camera target to the right (X axis)
          y: 0, // Keep Y unchanged
          z: 0, // Keep Z unchanged
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-3', // The animation is triggered by Section-3
            start: 'top bottom', // Start when Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync the animation with scroll position
          }
        },
        '<' // Keep this animation in sync with the camera position animation
      )
      // Section 3 -> Section 4 animation: Camera moves to a new position
      tl.fromTo(
        camera.position, // From the position at the end of Section-2
        {
          x: 0, // Move the camera to the center on the X axis
          y: -1.01, // Keep the Y position the same
          z: 5 // Move the camera further away along the Z axis
        }, // Starting position (end of Section-2)

        {
          x: 2.56,
          y: -1.01,
          z: 2,
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-4', // Trigger animation when Section-3 comes into view
            start: 'top bottom', // Start when the top of Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when the bottom of Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync animation with scroll position
          }
        }
      )

      // Section 3 -> Section 4 animation: Change camera target to look in a different direction
      tl.fromTo(
        cameraTarget, // Starting from the target position of Section-2
        {
          x: 4, // Move the camera target to the right (X axis)
          y: 0, // Keep Y unchanged
          z: 0 // Keep Z unchanged
        }, // Starting target position

        {
          x: -4,
          y: 0,
          z: 0,
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-4', // The animation is triggered by Section-3
            start: 'top bottom', // Start when Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync the animation with scroll position
          }
        },
        '<' // Keep this animation in sync with the camera position animation
      )

      // Section 4 -> Section 5 animation: Camera moves to a new position
      tl.fromTo(
        camera.position, // From the position at the end of Section-2
        { x: 2.56, y: -1.01, z: 2 }, // Starting position (end of Section-2)
        {
          x: 0, // Move the camera to the center on the X axis
          y: -1.01, // Keep the Y position the same
          z: 5, // Move the camera further away along the Z axis
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-5', // Trigger animation when Section-3 comes into view
            start: 'top bottom', // Start when the top of Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when the bottom of Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync animation with scroll position
          }
        }
      )

      // Section 4 -> Section 5 animation: Change camera target to look in a different direction
      tl.fromTo(
        cameraTarget, // Starting from the target position of Section-2
        { x: -4, y: 0, z: 0 }, // Starting target position
        {
          x: 4, // Move the camera target to the right (X axis)
          y: 0, // Keep Y unchanged
          z: 0, // Keep Z unchanged
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-5', // The animation is triggered by Section-3
            start: 'top bottom', // Start when Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync the animation with scroll position
          }
        },
        '<' // Keep this animation in sync with the camera position animation
      )

      // Section 5 -> Section 6 animation: Camera moves to a new position
      tl.fromTo(
        camera.position, // From the position at the end of Section-2
        {
          x: 0, // Move the camera to the center on the X axis
          y: -1.01, // Keep the Y position the same
          z: 5 // Move the camera further away along the Z axis
        }, // Starting position (end of Section-2)

        {
          x: 2.56,
          y: -1.01,
          z: 2,
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-6', // Trigger animation when Section-3 comes into view
            start: 'top bottom', // Start when the top of Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when the bottom of Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync animation with scroll position
          }
        }
      )

      // Section 5 -> Section 6 animation: Change camera target to look in a different direction
      tl.fromTo(
        cameraTarget, // Starting from the target position of Section-2
        {
          x: 4, // Move the camera target to the right (X axis)
          y: 0, // Keep Y unchanged
          z: 0 // Keep Z unchanged
        }, // Starting target position

        {
          x: -4,
          y: 0,
          z: 0,
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-6', // The animation is triggered by Section-3
            start: 'top bottom', // Start when Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync the animation with scroll position
          }
        },
        '<' // Keep this animation in sync with the camera position animation
      )

      // Section 6 -> Section 7 animation: Camera moves to a new position
      tl.fromTo(
        camera.position, // From the position at the end of Section-2
        { x: 2.56, y: -1.01, z: 2 }, // Starting position (end of Section-2)
        {
          x: 0, // Move the camera to the center on the X axis
          y: -1.01, // Keep the Y position the same
          z: 5, // Move the camera further away along the Z axis
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-7', // Trigger animation when Section-3 comes into view
            start: 'top bottom', // Start when the top of Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when the bottom of Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync animation with scroll position
          }
        }
      )

      // Section 6 -> Section 7 animation: Change camera target to look in a different direction
      tl.fromTo(
        cameraTarget, // Starting from the target position of Section-2
        { x: -4, y: 0, z: 0 }, // Starting target position
        {
          x: 4, // Move the camera target to the right (X axis)
          y: 0, // Keep Y unchanged
          z: 0, // Keep Z unchanged
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-7', // The animation is triggered by Section-3
            start: 'top bottom', // Start when Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync the animation with scroll position
          }
        },
        '<' // Keep this animation in sync with the camera position animation
      )

      // Section 7 -> Section 8 animation: Camera moves to a new position
      tl.fromTo(
        camera.position, // From the position at the end of Section-2
        {
          x: 0, // Move the camera to the center on the X axis
          y: -1.01, // Keep the Y position the same
          z: 5 // Move the camera further away along the Z axis
        }, // Starting position (end of Section-2)

        {
          x: 2.56,
          y: -1.01,
          z: 2,
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-8', // Trigger animation when Section-3 comes into view
            start: 'top bottom', // Start when the top of Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when the bottom of Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync animation with scroll position
          }
        }
      )

      // Section 7 -> Section 8 animation: Change camera target to look in a different direction
      tl.fromTo(
        cameraTarget, // Starting from the target position of Section-2
        {
          x: 4, // Move the camera target to the right (X axis)
          y: 0, // Keep Y unchanged
          z: 0 // Keep Z unchanged
        }, // Starting target position

        {
          x: -4,
          y: 0,
          z: 0,
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-8', // The animation is triggered by Section-3
            start: 'top bottom', // Start when Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync the animation with scroll position
          }
        },
        '<' // Keep this animation in sync with the camera position animation
      )

      // Section 8 -> Section 9 animation: Camera moves to a new position
      tl.fromTo(
        camera.position, // From the position at the end of Section-2
        { x: 2.56, y: -1.01, z: 2 }, // Starting position (end of Section-2)
        {
          x: 0, // Move the camera to the center on the X axis
          y: -1.01, // Keep the Y position the same
          z: 5, // Move the camera further away along the Z axis
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-9', // Trigger animation when Section-3 comes into view
            start: 'top bottom', // Start when the top of Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when the bottom of Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync animation with scroll position
          }
        }
      )

      // Section 8 -> Section 9 animation: Change camera target to look in a different direction
      tl.fromTo(
        cameraTarget, // Starting from the target position of Section-2
        { x: -4, y: 0, z: 0 }, // Starting target position
        {
          x: 4, // Move the camera target to the right (X axis)
          y: 0, // Keep Y unchanged
          z: 0, // Keep Z unchanged
          ease: 'power2.inOut', // Smooth easing
          immediateRender: false, // Delay the rendering until the animation starts
          scrollTrigger: {
            trigger: '.section-9', // The animation is triggered by Section-3
            start: 'top bottom', // Start when Section-3 reaches the bottom of the viewport
            end: 'bottom bottom', // End when Section-3 reaches the bottom of the viewport
            scrub: 0.5 // Sync the animation with scroll position
          }
        },
        '<' // Keep this animation in sync with the camera position animation
      )
    },
    { dependencies: [] } // Empty dependency array, so this effect runs only once when the component mounts
  )

  return null // This component does not render anything to the DOM, it just handles the animation
}
