/**
 * Card Component with Dark Mode Support
 * 
 * Usage:
 * <Card>
 *   <CardHeader title="Card Title" subtitle="Optional subtitle" />
 *   <CardBody>
 *     Your content here
 *   </CardBody>
 *   <CardFooter>
 *     Footer content
 *   </CardFooter>
 * </Card>
 */

export function Card({ children, className = '' }) {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ title, subtitle, action }) {
    return (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>
        </div>
    );
}

export function CardBody({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 rounded-b-lg ${className}`}>
            {children}
        </div>
    );
}

// Example Usage Component
export function CardExample() {
    return (
        <div className="space-y-6">
            {/* Simple Card */}
            <Card>
                <CardHeader 
                    title="User Statistics" 
                    subtitle="Overview of user activity"
                />
                <CardBody>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Users</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">856</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">378</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Inactive</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Card with Action Button */}
            <Card>
                <CardHeader 
                    title="Recent Activity" 
                    subtitle="Last 7 days"
                    action={
                        <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                            View All
                        </button>
                    }
                />
                <CardBody>
                    <div className="space-y-3">
                        <ActivityItem 
                            user="John Doe" 
                            action="created a new project" 
                            time="2 hours ago"
                        />
                        <ActivityItem 
                            user="Jane Smith" 
                            action="uploaded a document" 
                            time="5 hours ago"
                        />
                        <ActivityItem 
                            user="Mike Johnson" 
                            action="updated user settings" 
                            time="1 day ago"
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Card with Footer */}
            <Card>
                <CardHeader title="System Information" />
                <CardBody>
                    <dl className="space-y-2">
                        <InfoRow label="Server Status" value="Online" valueClass="text-green-600 dark:text-green-400" />
                        <InfoRow label="Database" value="Connected" valueClass="text-green-600 dark:text-green-400" />
                        <InfoRow label="Storage Used" value="45.2 GB / 100 GB" />
                        <InfoRow label="Last Backup" value="2 hours ago" />
                    </dl>
                </CardBody>
                <CardFooter>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Last updated: Just now
                        </span>
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            Refresh
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

// Helper Components
function ActivityItem({ user, action, time }) {
    return (
        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                {user.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-medium">{user}</span> {action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{time}</p>
            </div>
        </div>
    );
}

function InfoRow({ label, value, valueClass = '' }) {
    return (
        <div className="flex justify-between py-2">
            <dt className="text-sm text-gray-600 dark:text-gray-400">{label}</dt>
            <dd className={`text-sm font-medium text-gray-900 dark:text-gray-100 ${valueClass}`}>
                {value}
            </dd>
        </div>
    );
}
