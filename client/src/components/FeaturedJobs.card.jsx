import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const FeaturedJobsCard = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="my-16 max-md:my-12">
      <div className="flex flex-wrap gap-4 justify-between max-sm:justify-center">
        {arr.map((item, i) => (
          <div
            key={i}
            className="w-1/5 p-5 hover:shadow-md border striped-border bg-gray-50 rounded max-sm:w-full max-lg:w-2/5 max-md:p-3"
          >
            <div className="flex justify-between items-center">
              <img
                src="data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='-1.5 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round' stroke='%23CCCCCC' stroke-width='1.16'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Ctitle%3Eapple [%23173]%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Dribbble-Light-Preview' transform='translate(-102.000000, -7439.000000)' fill='%23000000'%3E%3Cg id='icons' transform='translate(56.000000, 160.000000)'%3E%3Cpath d='M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485' id='apple-[%23173]'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                alt="Company Logo"
                width="32"
                height="32"
                loading="lazy"
              />
              <span className="border px-2 py-1 rounded-md text-blue-600 border-blue-600">
                Full Time
              </span>
            </div>
            <section className="flex flex-col">
              <p className="font-semibold my-3 tracking-wider">Email Marketing</p>
              <p className="text-gray-500 my-1">Location: Jaipur</p>
              <p className="text-sm text-gray-400 my-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, officia.
              </p>
            </section>
          </div>
        ))}
      </div>
      <a
        href="#"
        className="flex items-center gap-x-3 text-gray-500 hover:underline cursor-pointer mt-6"
      >
        Show more jobs <HiOutlineArrowNarrowRight />
      </a>
    </div>
  );
};

export default FeaturedJobsCard;