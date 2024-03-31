import { Form } from './components/Form';
import bankMeLogo from '../../assets/logo-bankme.png';
import { RegisterModal } from './components/RegisterModal';

function Home() {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <section
        className="h-1/2 w-[70%] md:w-[30%] flex flex-col
        justify-around items-center border rounded-xl shadow-inner shadow-blue-400"
      >
        <img
          src={ bankMeLogo }
          className="w-[60px] md:w-[80px] mt-4 mb-4"
          alt="bankme logo"
        />
        <Form className="h-1/2 w-[80%] md:w-[50%] flex flex-col justify-evenly" />
        <RegisterModal />
      </section>
    </main>
  );
}

export default Home;
