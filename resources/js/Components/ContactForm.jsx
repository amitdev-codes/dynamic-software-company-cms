import { useForm,usePage } from '@inertiajs/react';

export default function ContactForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',          // new field
        email: '',
        subject: '',
        message: ''
    });

    // const [submitted, setSubmitted] = useState(false);
    const { flash } = usePage().props;
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {flash.success  && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {flash.success}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        required
                        className={`w-full px-4 py-3 rounded-lg border ${
                            errors.name ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                        placeholder="Ram Bahadur"
                        disabled={processing}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Mobile number field added here – before email */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number *
                    </label>
                    <div className="flex">
                        <span className="inline-flex items-center px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 font-medium">
                            +977
                        </span>
                        <input
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            required
                            className={`flex-1 px-4 py-3 rounded-r-lg border ${
                                errors.phone ? 'border-red-300' : 'border-gray-300'
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                            placeholder="9841234567"
                            disabled={processing}
                            pattern="[0-9]{10}"           // optional: enforce 10 digits
                            maxLength={10}
                            inputMode="numeric"
                        />
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        required
                        className={`w-full px-4 py-3 rounded-lg border ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                        placeholder="rambahadur@example.com"
                        disabled={processing}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                </label>
                <input
                    id="subject"
                    type="text"
                    value={data.subject}
                    onChange={e => setData('subject', e.target.value)}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                        errors.subject ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="Project Inquiry"
                    disabled={processing}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                </label>
                <textarea
                    id="message"
                    rows="5"
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                        errors.message ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="Tell us about your project requirements..."
                    disabled={processing}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {processing ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
