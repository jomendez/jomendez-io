import React from 'react';
import { PromptAlchemy } from '../components/PromptAlchemy';

/**
 * Page wrapper for the PromptAlchemy component.
 * This demonstrates how to use the component as a full page.
 */
const PromptAlchemyPage = () => {
  return (
    <PromptAlchemy 
      // You can customize these props:
      // title="Custom Title"
      // subtitle="Custom description text"
      // showBackground={true}
      // className="additional-classes"
    />
  );
};

export default PromptAlchemyPage;
