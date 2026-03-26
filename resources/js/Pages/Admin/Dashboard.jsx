import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardHeader, CardBody, CardFooter } from '@/Components/Card';
import { TableCard, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from '@/Components/Table';

/**
 * Example Dashboard Page
 * Demonstrates how to use the AdminLayout with Cards and Tables in dark mode
 */
export default function Dashboard({ stats, recentUsers, recentActivity }) {
    return (
        <AdminLayout title="Dashboard">
            <div className="space-y-6">
                
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
                    <p className="text-blue-100">Here's what's happening with your platform today.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Total Users" 
                        value="1,234" 
                        change="+12.5%" 
                        trend="up"
                        icon={<UsersIcon />}
                        color="blue"
                    />
                    <StatCard 
                        title="Active Sessions" 
                        value="856" 
                        change="+8.2%" 
                        trend="up"
                        icon={<ActivityIcon />}
                        color="green"
                    />
                    <StatCard 
                        title="Revenue" 
                        value="$45,231" 
                        change="-3.1%" 
                        trend="down"
                        icon={<RevenueIcon />}
                        color="purple"
                    />
                    <StatCard 
                        title="New Signups" 
                        value="42" 
                        change="+18.3%" 
                        trend="up"
                        icon={<SignupIcon />}
                        color="orange"
                    />
                </div>

                {/* Charts and Activity Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Quick Stats */}
                    <Card>
                        <CardHeader 
                            title="System Status" 
                            subtitle="Real-time monitoring"
                        />
                        <CardBody>
                            <div className="space-y-4">
                                <StatusItem 
                                    label="Server Status" 
                                    value="Online" 
                                    status="success"
                                />
                                <StatusItem 
                                    label="Database" 
                                    value="Connected" 
                                    status="success"
                                />
                                <StatusItem 
                                    label="Storage Used" 
                                    value="45.2 GB / 100 GB" 
                                    status="info"
                                />
                                <StatusItem 
                                    label="API Rate Limit" 
                                    value="78% remaining" 
                                    status="warning"
                                />
                                <StatusItem 
                                    label="Backup Status" 
                                    value="Last backup 2h ago" 
                                    status="success"
                                />
                            </div>
                        </CardBody>
                        <CardFooter>
                            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                View detailed metrics →
                            </button>
                        </CardFooter>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader 
                            title="Recent Activity" 
                            subtitle="Last 24 hours"
                            action={
                                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                    View All
                                </button>
                            }
                        />
                        <CardBody className="max-h-96 overflow-y-auto">
                            <div className="space-y-3">
                                {recentActivity.map((activity, index) => (
                                    <ActivityItem 
                                        key={index}
                                        user={activity.user}
                                        action={activity.action}
                                        time={activity.time}
                                        type={activity.type}
                                    />
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Recent Users Table */}
                <TableCard 
                    title="Recent Users" 
                    subtitle="Newest registered members"
                    action={
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                            View All Users
                        </button>
                    }
                >
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentUsers.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    ID: {user.id}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-400">
                                        {user.email}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            user.role === 'Admin' ? 'info' : 
                                            user.role === 'Editor' ? 'success' : 
                                            'default'
                                        }>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-400">
                                        {user.joined}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'active' ? 'success' : 'warning'}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition">
                                                View
                                            </button>
                                            <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition">
                                                Edit
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableCard>

                {/* Quick Actions */}
                <Card>
                    <CardHeader title="Quick Actions" />
                    <CardBody>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <QuickActionButton 
                                icon={<AddUserIcon />}
                                label="Add User"
                                onClick={() => console.log('Add user')}
                            />
                            <QuickActionButton 
                                icon={<UploadIcon />}
                                label="Upload File"
                                onClick={() => console.log('Upload file')}
                            />
                            <QuickActionButton 
                                icon={<SettingsIcon />}
                                label="Settings"
                                onClick={() => console.log('Settings')}
                            />
                            <QuickActionButton 
                                icon={<ReportIcon />}
                                label="Generate Report"
                                onClick={() => console.log('Generate report')}
                            />
                        </div>
                    </CardBody>
                </Card>

            </div>
        </AdminLayout>
    );
}

// Stat Card Component
function StatCard({ title, value, change, trend, icon, color }) {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
        orange: 'from-orange-500 to-orange-600',
    };

    return (
        <Card>
            <CardBody>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                            {value}
                        </p>
                        <p className={`text-sm mt-2 ${
                            trend === 'up' 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-red-600 dark:text-red-400'
                        }`}>
                            {change} from last month
                        </p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center text-white`}>
                        {icon}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

// Status Item Component
function StatusItem({ label, value, status }) {
    const statusColors = {
        success: 'text-green-600 dark:text-green-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
        danger: 'text-red-600 dark:text-red-400',
        info: 'text-blue-600 dark:text-blue-400',
    };

    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
            <span className={`text-sm font-medium ${statusColors[status]}`}>
                {value}
            </span>
        </div>
    );
}

// Activity Item Component
function ActivityItem({ user, action, time, type }) {
    const typeColors = {
        create: 'bg-green-500',
        update: 'bg-blue-500',
        delete: 'bg-red-500',
        login: 'bg-purple-500',
    };

    return (
        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <div className={`w-8 h-8 ${typeColors[type]} rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
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

// Quick Action Button Component
function QuickActionButton({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition group"
        >
            <div className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
                {label}
            </span>
        </button>
    );
}

// Icons
function UsersIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

function ActivityIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    );
}

function RevenueIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function SignupIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
    );
}

function AddUserIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
    );
}

function UploadIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function ReportIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

// Sample Data for Testing (remove this in production)
Dashboard.defaultProps = {
    stats: {
        totalUsers: 1234,
        activeSessions: 856,
        revenue: 45231,
        newSignups: 42
    },
    recentUsers: [
        { id: 1001, name: 'John Doe', email: 'john@example.com', role: 'Admin', joined: '2 days ago', status: 'active' },
        { id: 1002, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', joined: '3 days ago', status: 'active' },
        { id: 1003, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', joined: '5 days ago', status: 'pending' },
        { id: 1004, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Editor', joined: '1 week ago', status: 'active' },
        { id: 1005, name: 'Tom Brown', email: 'tom@example.com', role: 'Viewer', joined: '1 week ago', status: 'active' },
    ],
    recentActivity: [
        { user: 'John Doe', action: 'created a new project', time: '2 hours ago', type: 'create' },
        { user: 'Jane Smith', action: 'updated user profile', time: '3 hours ago', type: 'update' },
        { user: 'Mike Johnson', action: 'logged in from new device', time: '5 hours ago', type: 'login' },
        { user: 'Sarah Williams', action: 'deleted a document', time: '6 hours ago', type: 'delete' },
        { user: 'Tom Brown', action: 'uploaded a new file', time: '8 hours ago', type: 'create' },
    ]
};
