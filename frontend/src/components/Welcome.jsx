import { NavLink } from "react-router";


const Welcome = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen text-center px-6">
                <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to HandsOn</h1>
                <p className="text-lg text-gray-700 max-w-2xl">
                    HandsOn is a community-driven volunteering platform where you can find
                    opportunities to make an impact. Whether you care about education,
                    healthcare, or the environment, join us to contribute and connect with
                    like-minded people.
                </p>

                <div className="mt-6 space-x-4">
                    <NavLink to="/register" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Get Started
                    </NavLink>
                </div>
            </div>
        </>

    );
};

export default Welcome;
