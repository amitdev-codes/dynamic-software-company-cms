import { BiCodeBlock, BiUser, BiWrench } from 'react-icons/bi';
import { FiAward } from 'react-icons/fi';
import { HiBeaker } from 'react-icons/hi';
import { MdAttachMoney, MdFolder, MdSchool, MdWaterDrop } from 'react-icons/md';

export const ICON_MAP = {
    FiAward,
    BiCodeBlock,
    MdFolder,
    HiBeaker,
    MdSchool,
    BiWrench,
    MdAttachMoney,
    BiPeople: BiUser,
    MdWaterDrop,
};

export const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

const COLOR_VARIANTS = {
    '#3B82F6': 'blue',
    '#8B5CF6': 'purple',
    '#F59E0B': 'amber',
    '#EC4899': 'pink',
    '#10B981': 'emerald',
    '#06B6D4': 'cyan',
    '#14B8A6': 'teal',
    '#F97316': 'orange',
    '#0EA5E9': 'sky',
};

const COLOR_CLASSES = {
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-500/10',
        border: 'border-blue-100 dark:border-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-500/10',
        border: 'border-purple-100 dark:border-purple-500/20',
        text: 'text-purple-600 dark:text-purple-400',
    },
    amber: {
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        border: 'border-amber-100 dark:border-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
    },
    pink: {
        bg: 'bg-pink-50 dark:bg-pink-500/10',
        border: 'border-pink-100 dark:border-pink-500/20',
        text: 'text-pink-600 dark:text-pink-400',
    },
    emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        border: 'border-emerald-100 dark:border-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
    },
    cyan: {
        bg: 'bg-cyan-50 dark:bg-cyan-500/10',
        border: 'border-cyan-100 dark:border-cyan-500/20',
        text: 'text-cyan-600 dark:text-cyan-400',
    },
    teal: {
        bg: 'bg-teal-50 dark:bg-teal-500/10',
        border: 'border-teal-100 dark:border-teal-500/20',
        text: 'text-teal-600 dark:text-teal-400',
    },
    orange: {
        bg: 'bg-orange-50 dark:bg-orange-500/10',
        border: 'border-orange-100 dark:border-orange-500/20',
        text: 'text-orange-600 dark:text-orange-400',
    },
    sky: {
        bg: 'bg-sky-50 dark:bg-sky-500/10',
        border: 'border-sky-100 dark:border-sky-500/20',
        text: 'text-sky-600 dark:text-sky-400',
    },
};

export function getColorClasses(iconColor = '#3B82F6') {
    return COLOR_CLASSES[COLOR_VARIANTS[iconColor] || 'blue'];
}

export function getIconComponent(icon) {
    return ICON_MAP[icon] || FiAward;
}
