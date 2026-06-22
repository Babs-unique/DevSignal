import { useState } from 'react';

export const useTogglePassword = () => {
    const [isHidden, setIsHidden] = useState(true);
    const togglePassword = () => setIsHidden(!isHidden);
    return { isHidden, togglePassword };
};