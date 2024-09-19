import React, {Fragment} from 'react';
;
import CurrentSubscription from './Current/CurrentSubscription';
import Subscriptionhistory from './History/Subscriptionhistory';




export default function Subscription() {

  return (
    <Fragment>
      <div className="container mx-auto p-4 space-y-6  dark:text-white transition-colors duration-200">
      <CurrentSubscription/>
      <Subscriptionhistory/>     
      </div>
    </Fragment>
  );
}