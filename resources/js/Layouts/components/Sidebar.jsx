import { Link } from '@inertiajs/react';
import { BiBox,BiFolderOpen,BiCommentDetail,BiInfoCircle,BiUserCircle,BiWebcam,BiLinkAlt,BiBriefcase } from "react-icons/bi";
import { FaMailBulk } from "react-icons/fa";


export default function Sidebar({ sidebarOpen, setSidebarOpen, auth, openMenus, toggleMenu, logout, t }) {
    return (
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 dark:bg-gray-950 text-white transition-all duration-300 flex flex-col shadow-xl`}>
            {/* Logo & Toggle */}
            <div className="p-4 border-b border-gray-700 dark:border-gray-800 flex items-center justify-between">
                {sidebarOpen && (
                    <div>
                        <h1 className="text-xl font-bold text-white">Test</h1>
                        <p className="text-sm text-gray-400">{t('adminPanel')}</p>
                    </div>
                )}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* User Info */}
            {sidebarOpen && (
                <div className="p-4 border-b border-gray-700 dark:border-gray-800">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-semibold">
                            {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                            <p className="font-medium text-sm">{auth.user.name}</p>
                            <p className="text-xs text-gray-400 truncate">{auth.user.email}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                {/* Dashboard */}
                <NavLink
                    href={route('admin.dashboard')}
                    active={route().current('admin.dashboard')}
                    icon={<DashboardIcon />}
                    sidebarOpen={sidebarOpen}
                >
                    {t('dashboard')}
                </NavLink>

                {/* Content Menu */}
                <ExpandableMenu
                    title={t('content')}
                    icon={<ContentIcon />}
                    open={openMenus.content}
                    onToggle={() => toggleMenu('content')}
                    sidebarOpen={sidebarOpen}
                >
                    <SubNavLink
                        icon={<BiBox size={18} />}
                        href={route('admin.projects.index')}
                        active={route().current('admin.projects.*')}
                    >
                        {t('projects')}
                    </SubNavLink>
                    <SubNavLink
                        icon={<BiFolderOpen size={18} />}
                        href={route('admin.products.index')}
                        active={route().current('admin.products.*')}
                    >
                        {t('products')}
                    </SubNavLink>
                    <SubNavLink
                        icon={<BiBriefcase size={18} />}
                        href={route('admin.services.index')}
                        active={route().current('admin.services.*')}
                    >
                        {t('services')}
                    </SubNavLink>
                    <SubNavLink
                        icon={<BiCommentDetail size={18} />}
                        href={route('admin.testimonials.index')}
                        active={route().current('admin.testimonials.*')}
                    >
                        {t('testimonials')}
                    </SubNavLink>
                    <SubNavLink
                        icon={<BiInfoCircle size={18} />}
                        href={route('admin.aboutContent.edit')}
                        active={route().current('admin.aboutContent.*')}
                    >
                        {t('aboutContent')}
                    </SubNavLink>
                </ExpandableMenu>


                {/* Users Menu */}
                <ExpandableMenu
                    title={t('users')}
                    icon={<UsersIcon />}
                    open={openMenus.users}
                    onToggle={() => toggleMenu('users')}
                    sidebarOpen={sidebarOpen}
                >
                    <SubNavLink
                        icon={<BiUserCircle size={18} />}
                        href={route('admin.users.index')}
                    >{t('allUsers')}</SubNavLink>
                    <SubNavLink
                        icon={<BiWebcam size={18} />}
                        href="#">{t('roles')}</SubNavLink>
                    <SubNavLink
                        icon={<BiLinkAlt size={18} />}
                        href="#">{t('permissions')}</SubNavLink>
                </ExpandableMenu>

                {/* Settings */}
                <NavLink
                    href={route('admin.settings.index')}
                    active={route().current('admin.settings.*')}
                    icon={<SettingsIcon />}
                    sidebarOpen={sidebarOpen}
                >
                    {t('settings')}
                </NavLink>

                {/* Messages */}
                <NavLink
                    href={route('admin.contacts.index')}
                    active={route().current('admin.contacts.*')}
                    icon={<FaMailBulk />}
                    sidebarOpen={sidebarOpen}
                >
                    {t('messages')}
                </NavLink>

                {/* Divider */}
                <div className="my-4 border-t border-gray-700 dark:border-gray-800"></div>

                {/* View Site */}
                <a
                    href={route('home')}
                    target="_blank"
                    className="flex items-center px-4 py-3 hover:bg-gray-800 dark:hover:bg-gray-900 transition"
                >
                    <ExternalLinkIcon />
                    {sidebarOpen && <span className="ml-3">{t('viewSite')}</span>}
                </a>

                {/* Logout */}
                <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-800 dark:hover:bg-gray-900 transition text-red-400"
                >
                    <LogoutIcon />
                    {sidebarOpen && <span className="ml-3">{t('logout')}</span>}
                </button>
            </nav>
        </aside>
    );
}

// Navigation Components
function NavLink({ href, active, icon, children, sidebarOpen }) {
    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-3 transition ${
                active
                    ? 'bg-gray-800 dark:bg-gray-900 border-l-4 border-blue-500'
                    : 'hover:bg-gray-800 dark:hover:bg-gray-900'
            }`}
        >
            <div className="flex-shrink-0">{icon}</div>
            {sidebarOpen && <span className="ml-3">{children}</span>}
        </Link>
    );
}

function ExpandableMenu({ title, icon, open, onToggle, children, sidebarOpen }) {
    if (!sidebarOpen) {
        return (
            <div className="px-4 py-3 hover:bg-gray-800 dark:hover:bg-gray-900">
                {icon}
            </div>
        );
    }

    return (
        <div>
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800 dark:hover:bg-gray-900 transition"
            >
                <div className="flex items-center">
                    {icon}
                    <span className="ml-3">{title}</span>
                </div>
                <svg
                    className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
                <div className="bg-gray-800 dark:bg-gray-900">
                    {children}
                </div>
            </div>
        </div>
    );
}

function SubNavLink({ href, active, children, icon }) {
    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-2 pl-12 text-sm transition ${
                active
                    ? 'bg-gray-700 dark:bg-gray-800 text-blue-400'
                    : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white'
            }`}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </Link>
    );
}

// Icons
function DashboardIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    );
}

function ContentIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
    );
}



function UsersIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function ExternalLinkIcon() {
    return (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    );
}
