interface Theme {
    backgroundColor: string,
    color: string,
    secondaryColor: string,
    borderColor: string,
    containerColor: string,
    translucentContainerColor: string,
    shadowColor: string
}

interface Accent {
    primary: string;
    seccondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
}

const LIGHT_THEME: Theme = {
    backgroundColor: '#fff',
    color: '#111111',
    secondaryColor: '#757575',
    borderColor: '#dddddd',
    containerColor: '#eeeeee',
    translucentContainerColor: '#dddddd80',
    shadowColor: '#fff'
}

const DARK_THEME: Theme = {
    backgroundColor: '#000',
    color: '#eeeeee',
    secondaryColor: '#757575',
    borderColor: '#1d1d1d',
    containerColor: '#141414',
    translucentContainerColor: '#1d1d1d80',
    shadowColor: '#000'
}

const ACCENT_COLORS: Accent = {
    primary: '#3700ff',
    seccondary: '#ff0058',
    success: '#00d25b',
    danger: '#ff0000',
    warning: '#ffaa00',
    info: '#00aaff'
}

export { LIGHT_THEME, DARK_THEME, ACCENT_COLORS };