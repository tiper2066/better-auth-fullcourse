import Header from '@/components/front/Header';

const FrontLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-gradient-to-b from-gray-50 to-white min-h-screen'>
            <Header />
            {children}
        </div>
    );
};
export default FrontLayout;
