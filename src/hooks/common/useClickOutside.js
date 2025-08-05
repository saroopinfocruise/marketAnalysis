import { useEffect } from "react";

/**
 * Custom hook to handle click outside of a referenced element
 * @param {Object} ref - React ref of the element to detect outside clicks
 * @param {Function} handler - Function to execute on outside click
 */
export default function useClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            // If click is inside element, do nothing
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event); // Call handler on outside click
        };

        document.addEventListener("mousedown", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler]);
}
