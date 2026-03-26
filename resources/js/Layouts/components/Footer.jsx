export default function Footer({ t }) {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200 mt-auto">
            <div className="px-8 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        © {currentYear} CloudCom. All rights reserved.
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                            {t('privacyPolicy')}
                        </a>
                        <span>•</span>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                            {t('termsOfService')}
                        </a>
                        <span>•</span>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                            {t('support')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
