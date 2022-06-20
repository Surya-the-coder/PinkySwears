import Link from "next/link";

const termsandconditions = () => {
	return (
		<div className="flex max-h-screen min-h-screen min-w-full flex-col items-center bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
			<h1 className=" py-4 text-center  text-black text-2xl font-bold font-[Sarabun-Bold]">Terms and Conditions</h1>			
			<p className=" py-4 mx-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sit cumque in, consequatur, quas assumenda facilis deleniti ab iusto saepe minima, distinctio quod dicta numquam officia. Rem illo ducimus qui.
			Quo laborum sapiente eligendi, incidunt esse in ratione impedit velit excepturi repellendus maxime, voluptatem ex deleniti consequuntur commodi blanditiis quod non quis laboriosam vitae suscipit! Maxime dolorum exercitationem cumque itaque?
			Ipsam blanditiis quos deleniti, obcaecati, iusto, a doloremque quasi amet exercitationem cumque velit quisquam dolorum et culpa eos! Vero numquam minus consequatur dignissimos eum ea asperiores, dicta dolorem cupiditate accusamus?
			</p>
			<div className='mt-5 w-full flex justify-center'>
			    <Link href="/">
			        <button className='mx-3 mt-4 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-full w-full h-[56px] cursor-pointer'>Back to Sign Up Page</button>  
			    </Link>
			</div>
		</div>
	);
}

export default termsandconditions;