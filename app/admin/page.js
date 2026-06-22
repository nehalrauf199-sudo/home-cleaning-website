'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('services');
    const [services, setServices] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    // Service Form State
    const [serviceForm, setServiceForm] = useState({
        title: '',
        description: '',
        shortDesc: '',
        image: null // Will store File object or string URL
    });

    // Site Settings
    const [siteSettings, setSiteSettings] = useState({
        phone: '+92 300 1234567',
        email: 'info@cleanhome.com',
        location: 'Karachi, Pakistan',
        workingHours: 'Mon-Sun: 8:00 AM - 8:00 PM'
    });

    // Fetch data
    const fetchData = async () => {
        try {
            // Fetch services
            const servicesRes = await fetch('/api/services');
            const servicesData = await servicesRes.json();
            if (Array.isArray(servicesData)) setServices(servicesData);

            // Fetch messages
            const messagesRes = await fetch('/api/contact');
            const messagesData = await messagesRes.json();
            if (Array.isArray(messagesData)) setMessages(messagesData);

            // Fetch reviews
            const reviewsRes = await fetch('/api/reviews');
            const reviewsData = await reviewsRes.json();
            if (Array.isArray(reviewsData)) setReviews(reviewsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Load data
    useEffect(() => {
        fetchData();

        const savedSettings = localStorage.getItem('siteSettings');
        if (savedSettings) {
            try {
                setSiteSettings(JSON.parse(savedSettings));
            } catch (e) { }
        }
    }, []);

    // Auth check
    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        } else {
            router.push('/admin-login');
        }
        setLoading(false);
    }, [router]);

    // Add Service with Image Upload
    const addService = async () => {
        if (!serviceForm.title || !serviceForm.description) {
            alert('Please fill in all fields');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('title', serviceForm.title);
            formData.append('description', serviceForm.description);
            formData.append('shortDesc', serviceForm.shortDesc || '');

            // Handle image - if it's a File object, append it
            if (serviceForm.image && typeof serviceForm.image === 'object') {
                formData.append('image', serviceForm.image);
            }

            const res = await fetch('/api/services/add', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                await fetchData();
                setServiceForm({ title: '', description: '', shortDesc: '', image: null });
                setShowAddForm(false);
                alert('Service added successfully!');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to add service');
            }
        } catch (error) {
            console.error('Error adding service:', error);
            alert('Error adding service');
        } finally {
            setUploading(false);
        }
    };

    // Delete Service
    const deleteService = async (id) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const res = await fetch(`/api/services/delete?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchData();
                alert('Service deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    // Edit Service
    const editService = (service) => {
        setEditingService(service);
        setServiceForm({
            title: service.title,
            description: service.description,
            shortDesc: service.shortDesc || '',
            image: service.image || '/images/service-home.jpg'
        });
        setShowAddForm(true);
    };

    // Update Service with Image Upload
    const updateService = async () => {
        if (!serviceForm.title || !serviceForm.description) {
            alert('Please fill in all fields');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('id', editingService._id);
            formData.append('title', serviceForm.title);
            formData.append('description', serviceForm.description);
            formData.append('shortDesc', serviceForm.shortDesc || '');

            // Handle image - if it's a File object, append it
            if (serviceForm.image && typeof serviceForm.image === 'object') {
                formData.append('image', serviceForm.image);
            }

            const res = await fetch('/api/services/update', {
                method: 'PUT',
                body: formData
            });

            if (res.ok) {
                await fetchData();
                setServiceForm({ title: '', description: '', shortDesc: '', image: null });
                setEditingService(null);
                setShowAddForm(false);
                alert('Service updated successfully!');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to update service');
            }
        } catch (error) {
            console.error('Error updating service:', error);
            alert('Error updating service');
        } finally {
            setUploading(false);
        }
    };

    // Delete Message
    const deleteMessage = async (id) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchData();
                alert('Message deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    // Approve Review
    const approveReview = async (id) => {
        try {
            const res = await fetch('/api/reviews', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action: 'approve' })
            });

            if (res.ok) {
                await fetchData();
                alert('Review approved!');
            }
        } catch (error) {
            console.error('Error approving review:', error);
        }
    };

    // Delete Review
    const deleteReview = async (id) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            const res = await fetch('/api/reviews', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action: 'delete' })
            });

            if (res.ok) {
                await fetchData();
                alert('Review deleted!');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    // Save Settings
    const saveSettings = () => {
        localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
        alert('Settings saved successfully!');
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        router.push('/admin-login');
    };

    // Handle image selection
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setServiceForm({ ...serviceForm, image: file });
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F0F7F4'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    border: '4px solid #2A9D8F',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F0F7F4' }}>
            {/* Top Navigation Bar */}
            <nav style={{
                backgroundColor: '#2A9D8F',
                padding: '0 24px',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '64px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                            Admin Panel
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }}>
                        {['services', 'messages', 'reviews', 'settings'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: activeTab === tab ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.7)',
                                    fontSize: '13px',
                                    fontWeight: activeTab === tab ? '600' : '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {tab === 'services' ? 'Services' :
                                    tab === 'messages' ? 'Messages' :
                                        tab === 'reviews' ? 'Reviews' : 'Settings'}
                                {tab === 'messages' && messages.length > 0 && (
                                    <span style={{
                                        marginLeft: '4px',
                                        background: '#EF4444',
                                        color: 'white',
                                        padding: '1px 8px',
                                        borderRadius: '12px',
                                        fontSize: '10px'
                                    }}>{messages.length}</span>
                                )}
                                {tab === 'reviews' && reviews.filter(r => !r.approved).length > 0 && (
                                    <span style={{
                                        marginLeft: '4px',
                                        background: '#F59E0B',
                                        color: 'white',
                                        padding: '1px 8px',
                                        borderRadius: '12px',
                                        fontSize: '10px'
                                    }}>{reviews.filter(r => !r.approved).length}</span>
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '6px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'transparent',
                            color: 'white',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
                {/* SERVICES TAB */}
                {activeTab === 'services' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a2e2a' }}>Manage Services</h2>
                            <button
                                onClick={() => {
                                    setShowAddForm(!showAddForm);
                                    setEditingService(null);
                                    setServiceForm({ title: '', description: '', shortDesc: '', image: null });
                                }}
                                style={{
                                    padding: '10px 24px',
                                    background: '#2A9D8F',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                + Add New Service
                            </button>
                        </div>

                        {showAddForm && (
                            <div style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '24px',
                                marginBottom: '24px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                            }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a2e2a', marginBottom: '16px' }}>
                                    {editingService ? 'Edit Service' : 'Add New Service'}
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <input
                                        type="text"
                                        placeholder="Service Title"
                                        value={serviceForm.title}
                                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                                        style={{
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            border: '1.5px solid #E8F3F0',
                                            fontSize: '14px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Short Description"
                                        value={serviceForm.shortDesc}
                                        onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                                        style={{
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            border: '1.5px solid #E8F3F0',
                                            fontSize: '14px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                    />
                                    <textarea
                                        placeholder="Full Description"
                                        value={serviceForm.description}
                                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                                        rows="3"
                                        style={{
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            border: '1.5px solid #E8F3F0',
                                            fontSize: '14px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease',
                                            gridColumn: '1 / -1',
                                            resize: 'vertical'
                                        }}
                                        required
                                    />

                                    {/* Image Upload */}
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: '#1a2e2a',
                                            marginBottom: '8px'
                                        }}>
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                borderRadius: '12px',
                                                border: '1.5px solid #E8F3F0',
                                                fontSize: '14px',
                                                background: 'white',
                                                outline: 'none',
                                                transition: 'border-color 0.2s ease'
                                            }}
                                        />
                                        {/* Image Preview */}
                                        {serviceForm.image && typeof serviceForm.image === 'string' && (
                                            <div style={{ marginTop: '10px' }}>
                                                <img
                                                    src={serviceForm.image}
                                                    alt="Preview"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {serviceForm.image && typeof serviceForm.image === 'object' && (
                                            <div style={{ marginTop: '10px' }}>
                                                <img
                                                    src={URL.createObjectURL(serviceForm.image)}
                                                    alt="Preview"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                    <button
                                        onClick={editingService ? updateService : addService}
                                        disabled={uploading}
                                        style={{
                                            padding: '10px 24px',
                                            background: uploading ? '#94A3B8' : '#2A9D8F',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            cursor: uploading ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {uploading ? 'Uploading...' : (editingService ? 'Update Service' : 'Add Service')}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setEditingService(null);
                                            setServiceForm({ title: '', description: '', shortDesc: '', image: null });
                                        }}
                                        style={{
                                            padding: '10px 24px',
                                            background: '#E5E7EB',
                                            color: '#374151',
                                            border: 'none',
                                            borderRadius: '12px',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Services List */}
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {services.map((service) => (
                                <div
                                    key={service._id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: 'white',
                                        padding: '16px 20px',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            background: '#E8F3F0'
                                        }}>
                                            <img
                                                src={service.image || '/images/service-home.jpg'}
                                                alt={service.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '600', color: '#1a2e2a' }}>{service.title}</p>
                                            <p style={{ fontSize: '13px', color: '#5a7a72' }}>{service.shortDesc}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => editService(service)}
                                            style={{
                                                padding: '6px 16px',
                                                background: 'transparent',
                                                color: '#2A9D8F',
                                                border: '1px solid #2A9D8F',
                                                borderRadius: '8px',
                                                fontSize: '13px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteService(service._id)}
                                            style={{
                                                padding: '6px 16px',
                                                background: 'transparent',
                                                color: '#EF4444',
                                                border: '1px solid #EF4444',
                                                borderRadius: '8px',
                                                fontSize: '13px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* MESSAGES TAB */}
                {activeTab === 'messages' && (
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a2e2a', marginBottom: '8px' }}>
                            Contact Messages
                        </h2>
                        <p style={{ color: '#5a7a72', marginBottom: '24px' }}>
                            Messages sent through the contact form
                        </p>

                        {messages.length === 0 ? (
                            <div style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '40px',
                                textAlign: 'center',
                                color: '#5a7a72'
                            }}>
                                No messages yet.
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        style={{
                                            background: 'white',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                            borderLeft: '4px solid #2A9D8F'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h4 style={{ fontWeight: '600', color: '#1a2e2a' }}>{msg.name}</h4>
                                                <p style={{ fontSize: '13px', color: '#5a7a72' }}>📧 {msg.email}</p>
                                                {msg.phone && <p style={{ fontSize: '13px', color: '#5a7a72' }}>📞 {msg.phone}</p>}
                                                <p style={{ marginTop: '8px', color: '#1a2e2a' }}>{msg.message}</p>
                                                <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '8px' }}>
                                                    {new Date(msg.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => deleteMessage(msg.id)}
                                                style={{
                                                    padding: '4px 12px',
                                                    background: '#EF4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    fontSize: '12px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* REVIEWS TAB */}
                {activeTab === 'reviews' && (
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a2e2a', marginBottom: '8px' }}>
                            Manage Reviews
                        </h2>
                        <p style={{ color: '#5a7a72', marginBottom: '24px' }}>
                            Approve or delete customer reviews
                        </p>

                        {reviews.length === 0 ? (
                            <div style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '40px',
                                textAlign: 'center',
                                color: '#5a7a72'
                            }}>
                                No reviews yet.
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        style={{
                                            background: 'white',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                            opacity: review.approved ? 1 : 0.7
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <h4 style={{ fontWeight: '600', color: '#1a2e2a' }}>{review.name}</h4>
                                                    <span style={{ fontSize: '12px', color: '#5a7a72' }}>{review.location}</span>
                                                    <span style={{ fontSize: '12px', color: '#F59E0B' }}>
                                                        {'★'.repeat(review.rating)}
                                                    </span>
                                                </div>
                                                <p style={{ marginTop: '8px', color: '#1a2e2a' }}>{review.text}</p>
                                                <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '8px' }}>
                                                    {new Date(review.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {!review.approved && (
                                                    <button
                                                        onClick={() => approveReview(review.id)}
                                                        style={{
                                                            padding: '4px 12px',
                                                            background: '#2A9D8F',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontSize: '12px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteReview(review.id)}
                                                    style={{
                                                        padding: '4px 12px',
                                                        background: '#EF4444',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        fontSize: '12px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        {!review.approved && (
                                            <div style={{
                                                marginTop: '8px',
                                                padding: '4px 12px',
                                                background: '#FEF3C7',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                color: '#92400E'
                                            }}>
                                                ⏳ Pending Approval
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a2e2a', marginBottom: '8px' }}>
                            Site Settings
                        </h2>
                        <p style={{ color: '#5a7a72', marginBottom: '24px' }}>
                            These settings will update everywhere on the website (Footer, WhatsApp, Contact Page)
                        </p>

                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#5a7a72', marginBottom: '4px' }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={siteSettings.phone}
                                        onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            border: '1.5px solid #E8F3F0',
                                            fontSize: '14px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                    />
                                    <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                                        Updates footer, WhatsApp button, and contact page
                                    </p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#5a7a72', marginBottom: '4px' }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={siteSettings.email}
                                        onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            border: '1.5px solid #E8F3F0',
                                            fontSize: '14px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                    />
                                    <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                                        Updates footer and contact page
                                    </p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#5a7a72', marginBottom: '4px' }}>
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={siteSettings.location}
                                        onChange={(e) => setSiteSettings({ ...siteSettings, location: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            border: '1.5px solid #E8F3F0',
                                            fontSize: '14px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                    />
                                    <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                                        Updates contact page
                                    </p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', color: '#5a7a72', marginBottom: '4px' }}>
                                        Working Hours
                                    </label>
                                    <input
                                        type="text"
                                        value={siteSettings.workingHours}
                                        onChange={(e) => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            border: '1.5px solid #E8F3F0',
                                            fontSize: '14px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                    />
                                    <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                                        Updates contact page
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={saveSettings}
                                style={{
                                    marginTop: '20px',
                                    padding: '12px 32px',
                                    background: '#2A9D8F',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}