import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Tab } from '@headlessui/react';
import DropzoneInput from '@/Components/DropzoneInput';
import { toast } from 'react-toastify';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Settings({setting}) {
    return (
        <AdminLayout title="Settings">
            <Head title="Settings" />

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow">
                <div className="p-6 border-b dark:border-gray-800">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Application Settings
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage global configuration for your website
                    </p>
                </div>

                <Tab.Group vertical>
                    <div className="flex">
                        {/* Sidebar */}
                        <Tab.List className="w-64 border-r dark:border-gray-800 p-4 space-y-1">
                            {[
                                'General',
                                'Branding',
                                'SEO',
                                'Contact',
                                'Location',
                                'Social'
                            ].map((item) => (
                                <Tab
                                    key={item}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full text-left px-4 py-2 rounded-lg text-sm font-medium',
                                            selected
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        )
                                    }
                                >
                                    {item}
                                </Tab>
                            ))}
                        </Tab.List>

                        {/* Content */}
                        <Tab.Panels className="flex-1 p-6">
                            <Tab.Panel><GeneralSettings setting={setting}/></Tab.Panel>
                            <Tab.Panel><BrandingSettings setting={setting}/></Tab.Panel>
                            <Tab.Panel><SeoSettings setting={setting}/></Tab.Panel>
                            <Tab.Panel><ContactSettings setting={setting}/></Tab.Panel>
                            <Tab.Panel><LocationSettings setting={setting}/></Tab.Panel>
                            <Tab.Panel><SocialSettings setting={setting} /></Tab.Panel>
                        </Tab.Panels>
                    </div>
                </Tab.Group>
            </div>
        </AdminLayout>
    );
}

/* ---------------- Shared Input ---------------- */

function Input({ label, type = 'text', placeholder, value, onChange, ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value ?? ''}
                onChange={onChange}
                className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                {...props}
            />
        </div>
    );
}

/* ---------------- Panels ---------------- */

function GeneralSettings({ setting }) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        company_name: setting.company_name || '',
        company_slogan: setting.company_slogan || '',
        tagline: setting.tagline || '',
        short_description: setting.short_description || '',
        description: setting.description || '',
        founded_year: setting.founded_year || '',
        projects_delivered: setting.projects_delivered || '',
        client_satisfaction: setting.client_satisfaction || '',
        clients_count: setting.clients_count || '',
        years_of_experience: setting.years_of_experience || '',
    });



    const submit = (e) => {
        e.preventDefault();

        put(route('admin.settings.update',setting.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('General settings saved successfully!', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                });
            },
            onError: (err) => {
                toast.error('Please correct the errors in the form', {
                    position: "top-right",
                    autoClose: 5000,
                });
                // Optional: scroll to first error
                const firstErrorField = Object.keys(err)[0];
                document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company Name
                    </label>
                    <input
                        type="text"
                        value={data.company_name}
                        onChange={(e) => setData('company_name', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.company_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.company_name}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company Slogan
                    </label>
                    <input
                        type="text"
                        value={data.company_slogan}
                        onChange={(e) => setData('company_slogan', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.company_slogan && (
                        <p className="mt-1 text-sm text-red-600">{errors.company_slogan}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tagline / Slogan
                    </label>
                    <input
                        type="text"
                        value={data.tagline}
                        onChange={(e) => setData('tagline', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.tagline && (
                        <p className="mt-1 text-sm text-red-600">{errors.tagline}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Founded Year
                    </label>
                    <input
                        type="number"
                        placeholder="2020"
                        value={data.founded_year}
                        onChange={(e) => setData('founded_year', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.founded_year && (
                        <p className="mt-1 text-sm text-red-600">{errors.founded_year}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Projects Delivered
                    </label>
                    <input
                        type="text"
                        value={data.projects_delivered}
                        onChange={(e) => setData('projects_delivered', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.projects_delivered && (
                        <p className="mt-1 text-sm text-red-600">{errors.projects_delivered}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Client Satisfaction
                    </label>
                    <input
                        type="text"
                        value={data.client_satisfaction}
                        onChange={(e) => setData('client_satisfaction', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.client_satisfaction && (
                        <p className="mt-1 text-sm text-red-600">{errors.client_satisfaction}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Years Of Experience
                    </label>
                    <input
                        type="text"
                        value={data.years_of_experience}
                        onChange={(e) => setData('years_of_experience', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.years_of_experience && (
                        <p className="mt-1 text-sm text-red-600">{errors.years_of_experience}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Total Clients Count
                    </label>
                    <input
                        type="text"
                        value={data.clients_count}
                        onChange={(e) => setData('clients_count', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.clients_count && (
                        <p className="mt-1 text-sm text-red-600">{errors.clients_count}</p>
                    )}
                </div>



                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Short Description
                    </label>
                    <textarea
                        rows={3}
                        value={data.short_description}
                        onChange={(e) => setData('short_description', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="One-line summary of your company"
                    />
                    {errors.short_description && (
                        <p className="mt-1 text-sm text-red-600">{errors.short_description}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Description
                    </label>
                    <textarea
                        rows={5}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Detailed about us text..."
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                </div>


            </div>

            <div className="flex justify-end items-center gap-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {processing ? 'Saving...' : 'Save General'}
                </button>

                {recentlySuccessful && (
                    <span className="text-sm text-green-600 font-medium">✓ Saved</span>
                )}
            </div>
        </form>
    );
}

function BrandingSettings() {
    const { data, setData, post, processing } = useForm({
        logo_light: null,
        logo_dark: null,
        favicon: null,
        primary_color: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.settings.update'), {
            forceFormData: true, // REQUIRED when files are present
        });
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DropzoneInput
                    label="Logo (Light)"
                    onChange={(file) => setData('logo_light', file)}
                />
                <DropzoneInput
                    label="Logo (Dark)"
                    onChange={(file) => setData('logo_dark', file)}
                />
                <DropzoneInput
                    label="Favicon / Icon"
                    onChange={(file) => setData('favicon', file)}
                />
                <Input
                    label="Primary Color"
                    placeholder="#4f46e5"
                    value={data.primary_color}
                    onChange={(e) => setData('primary_color', e.target.value)}
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    Save Branding
                </button>
            </div>
        </form>
    );
}

function SeoSettings({setting}) {
    const { data, setData, post, processing } = useForm({
        meta_title:setting.meta_title || '',
        meta_description: setting.meta_description || '',
        meta_keywords: setting.meta_keywords || '',
        og_image: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.settings.update'), {
            forceFormData: true, // important because of file
        });
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Meta Title"
                    value={data.meta_title}
                    onChange={(e) => setData('meta_title', e.target.value)}
                />
                <Input
                    label="Meta Description"
                    value={data.meta_description}
                    onChange={(e) => setData('meta_description', e.target.value)}
                />
                <Input
                    label="Meta Keywords"
                    value={data.meta_keywords}
                    onChange={(e) => setData('meta_keywords', e.target.value)}
                />
                <DropzoneInput
                    label="OG Image"
                    onChange={(file) => setData('og_image', file)}
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    Save SEO
                </button>
            </div>
        </form>
    );
}

function ContactSettings({setting}) {
    const { data, setData, post, processing } = useForm({
        primary_email:setting.primary_email || '',
        support_email: setting.support_email || '',
        mobile_number: setting.mobile_number || '',
        whatsapp_number: setting.whatsapp_number || '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.settings.update'), { preserveState: true });
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Primary Email"
                    type="email"
                    value={data.primary_email}
                    onChange={(e) => setData('primary_email', e.target.value)}
                />
                <Input
                    label="Support Email"
                    type="email"
                    value={data.support_email}
                    onChange={(e) => setData('support_email', e.target.value)}
                />
                <Input
                    label="Mobile Number"
                    type="tel"
                    value={data.mobile_number}
                    onChange={(e) => setData('mobile_number', e.target.value)}
                />
                <Input
                    label="WhatsApp Number"
                    type="tel"
                    value={data.whatsapp_number}
                    onChange={(e) => setData('whatsapp_number', e.target.value)}
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    Save Contact
                </button>
            </div>
        </form>
    );
}

function LocationSettings({setting}) {
    const { data, setData, post, processing } = useForm({
        address:setting.address || '',
        city: setting.city || '',
        country: setting.country || '',
        business_hours: setting.business_hours || '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.settings.update'), { preserveState: true });
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Address"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                />
                <Input
                    label="City"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                />
                <Input
                    label="Country"
                    value={data.country}
                    onChange={(e) => setData('country', e.target.value)}
                />
                <Input
                    label="Business Hours"
                    placeholder="Mon-Fri: 9AM - 6PM"
                    value={data.business_hours}
                    onChange={(e) => setData('business_hours', e.target.value)}
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    Save Location
                </button>
            </div>
        </form>
    );
}

function SocialSettings({setting}) {
    const { data, setData, post, processing } = useForm({
        facebook_url: setting.facebook_url || '',
        twitter_url: setting.twitter_url || '',
        linkedin_url: setting.linkedin_url || '',
        github_url: setting.github_url || '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.settings.update'), { preserveState: true });
    }

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Facebook URL"
                    type="url"
                    placeholder="https://facebook.com/..."
                    value={data.facebook_url}
                    onChange={(e) => setData('facebook_url', e.target.value)}
                />
                <Input
                    label="Twitter / X URL"
                    type="url"
                    placeholder="https://x.com/..."
                    value={data.twitter_url}
                    onChange={(e) => setData('twitter_url', e.target.value)}
                />
                <Input
                    label="LinkedIn URL"
                    type="url"
                    placeholder="https://linkedin.com/..."
                    value={data.linkedin_url}
                    onChange={(e) => setData('linkedin_url', e.target.value)}
                />
                <Input
                    label="GitHub URL"
                    type="url"
                    placeholder="https://github.com/..."
                    value={data.github_url}
                    onChange={(e) => setData('github_url', e.target.value)}
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    Save Social
                </button>
            </div>
        </form>
    );
}