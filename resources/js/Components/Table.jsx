/**
 * Table Component with Dark Mode Support
 * 
 * Usage:
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Column 1</TableHead>
 *       <TableHead>Column 2</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Data 1</TableCell>
 *       <TableCell>Data 2</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */

export function Table({ children, className = '' }) {
    return (
        <div className="overflow-x-auto">
            <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${className}`}>
                {children}
            </table>
        </div>
    );
}

export function TableHeader({ children }) {
    return (
        <thead className="bg-gray-50 dark:bg-gray-800">
            {children}
        </thead>
    );
}

export function TableBody({ children }) {
    return (
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {children}
        </tbody>
    );
}

export function TableRow({ children, className = '' }) {
    return (
        <tr className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition ${className}`}>
            {children}
        </tr>
    );
}

export function TableHead({ children, className = '' }) {
    return (
        <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${className}`}>
            {children}
        </th>
    );
}

export function TableCell({ children, className = '' }) {
    return (
        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 ${className}`}>
            {children}
        </td>
    );
}

// Table with Card Wrapper
export function TableCard({ title, subtitle, action, children }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            {/* Header */}
            {(title || action) && (
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            {title && (
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                        {action && <div>{action}</div>}
                    </div>
                </div>
            )}
            
            {/* Table */}
            <div className="overflow-x-auto">
                {children}
            </div>
        </div>
    );
}

// Badge Component for Status
export function Badge({ children, variant = 'default' }) {
    const variants = {
        default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
        success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
        warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
        danger: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
        info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
}

// Example Usage Component
export function TableExample() {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'inactive' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Editor', status: 'active' },
        { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Viewer', status: 'pending' },
    ];

    return (
        <div className="space-y-6">
            {/* Simple Table */}
            <TableCard 
                title="User Management" 
                subtitle="Manage your team members"
                action={
                    <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                        Add User
                    </button>
                }
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="font-medium">{user.name}</span>
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
                                <TableCell>
                                    <Badge variant={
                                        user.status === 'active' ? 'success' : 
                                        user.status === 'inactive' ? 'danger' : 
                                        'warning'
                                    }>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                            <EditIcon />
                                        </button>
                                        <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableCard>

            {/* Compact Table */}
            <TableCard title="Recent Transactions">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-mono text-xs">#TXN-001</TableCell>
                            <TableCell>Website Development</TableCell>
                            <TableCell className="font-semibold text-green-600 dark:text-green-400">
                                $2,500.00
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">
                                Feb 15, 2024
                            </TableCell>
                            <TableCell>
                                <Badge variant="success">Completed</Badge>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-mono text-xs">#TXN-002</TableCell>
                            <TableCell>Logo Design</TableCell>
                            <TableCell className="font-semibold text-green-600 dark:text-green-400">
                                $500.00
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">
                                Feb 14, 2024
                            </TableCell>
                            <TableCell>
                                <Badge variant="warning">Pending</Badge>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-mono text-xs">#TXN-003</TableCell>
                            <TableCell>Mobile App Development</TableCell>
                            <TableCell className="font-semibold text-green-600 dark:text-green-400">
                                $5,000.00
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">
                                Feb 10, 2024
                            </TableCell>
                            <TableCell>
                                <Badge variant="success">Completed</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableCard>
        </div>
    );
}

// Icon Components
function EditIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    );
}

function DeleteIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    );
}
