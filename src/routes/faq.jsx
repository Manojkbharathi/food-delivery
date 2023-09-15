import React from 'react';
import '../components/faq.css';
import Question from '../components/questions';
import questions from '../components/data';
import Navbar from '../components/navbar';
const Faq = () => {
  return (
    <div>
      <Navbar />
      <div className='center'>
        <section className='info'>
          {questions.map((question) => {
            return <Question key={question.id} data={question} />;
          })}
        </section>
      </div>
    </div>
  );
};

export default Faq;
