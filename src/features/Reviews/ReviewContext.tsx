import React, { FunctionComponent, useState } from "react";
import { IReviewData } from "./ReviewCreation/types/types";

export const reviewData: IReviewData = {
  restaurant: { id: 0, name: "", address: "" },
  dish: { id: 0, name: "" },
  rating: 0,
  comment: ""
};

// Create Review Context
const ReviewContext = React.createContext(null);
// Set Review Provider
const ReviewProvider: FunctionComponent<any> = ({ children }) => {
  const [reviewState, setReviewState] = useState<
    IReviewData | React.Dispatch<React.SetStateAction<IReviewData>>
  >(reviewData);

  return (
    <ReviewContext.Provider value={{ reviewState, setReviewState }}>
      {children}
    </ReviewContext.Provider>
  );
};

export { ReviewContext, ReviewProvider };
