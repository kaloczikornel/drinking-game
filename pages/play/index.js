import Link from 'next/link';

export default function FirstPost() {
    return (
        <>
            <h1>First Post</h1>
            <h1 className="title">
                Welcome to{' '}
                <Link href="/">
                    <a>Vissza</a>
                </Link>
            </h1>
        </>
    );
}
