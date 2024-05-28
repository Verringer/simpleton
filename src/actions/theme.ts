import { ref } from 'vue';

export const selectedTheme = ref('')

export const setTheme = (theme: string) => {
    document.body.className = theme || '';
    localStorage.setItem('selectedTheme', theme);
    selectedTheme.value = theme;
}

export const initializeTheme = () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
}

initializeTheme()