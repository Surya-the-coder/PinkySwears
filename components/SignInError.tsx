import Link from "next/link";

const SignInError = () => {
    return (
        <div className="flex min-h-screen justify-center items-center">
            Please&nbsp;
            <Link href={'/'}>
                <p  className="text-pink-400 cursor-pointer"> Sign In </p>
            </Link>
            &nbsp;to access the page.
        </div>
    );
}

export default SignInError;