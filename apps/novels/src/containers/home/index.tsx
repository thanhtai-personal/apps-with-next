import { Link } from "@core-ui/react-core";
import ErrorImage from "@/assets/images/404.svg";
import { LazyImage } from "@core-ui/react-mui-core";

function Error(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center dark:bg-slate-900">
      <LazyImage alt="404-image" className="w-40 h-40" src={ErrorImage} />
      <div className="mx-auto mt-12 w-full max-w-[546px]">
        <h4 className="mb-4 text-slate-900">Page not found</h4>
        <div className="mb-10 text-base font-normal dark:text-white">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </div>
      </div>
      <div className="mx-auto w-full max-w-[300px]">
        <Link
          className="block text-center btn btn-dark dark:bg-slate-800"
          to="/"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}

export default Error;
