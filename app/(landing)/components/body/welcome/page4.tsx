import Image from 'next/image';

const TestimonialSection = () => {
  return (
    <section className="bg-emerald-800 text-white p-12 w-full md:h-[500px]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="flex-1 md:mr-6 mb-6 md:mb-0">
          <div className="relative">
            <Image
              src="/image33.jpg" // Replace with the path to your image
              alt="Testimonial"
              width={600}
              height={400}
              className="rounded-lg"
            />
            <div className="absolute -top-14 -left-4 text-6xl">
              <img src='/quots2.png'className='w-28 h-auto' alt='qouts'/>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white text-gray-900 p-6 rounded-lg relative">
          <p className="text-lg md:text-xl">
          À CPGE, j’ai pu développer mes compétences en communication et j’ai appris à bien travailler de manière autonome et en équipe. Avec le soutien de mes professeurs, j’ai pu acquérir une expérience pédagogique précieuse sur le campus et en dehors. En fin de compte, je deviens un meilleur leader.
          </p>
          <p className="mt-4 text-right font-bold text-emerald-700">
            - Etudiant
          </p>
          <div className="absolute -bottom-14 -right-2  text-6xl">
          <img src='/quots1.png' className='w-28 h-auto' alt='qouts' />
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </section>
  );
};

export default TestimonialSection;
