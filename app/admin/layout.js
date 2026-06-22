export default function AdminLayout({ children }) {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F0F7F4',
            margin: 0,
            padding: 0
        }}>
            {children}
        </div>
    );
}