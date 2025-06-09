import { UnexpectedErr } from "../errors";

/**
 * makes request to the backend for a product's information.
 * @throws { UnexpectedErr } for internal server errors or request that could not be properly made
 * @throws { AuthErr } when user is not authorized to view data
 * @throws { NotfoundErr } if productId does not exist
 **/
export async function getProduct(productId: string): Promise<GetProductResponse> {
  // TODO: write code for get product information

  try {
    return {
      name: "Pure Coconuts",
      price: "$ 40.00",
      numberOfReviews: 8,
      rating: 2.5,
      numberOfRatings: 200,
      imageUrls: [
        "https://plus.unsplash.com/premium_photo-1669324357471-e33e71e3f3d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    };
  } catch (err) {
    throw new UnexpectedErr({
      id: "GET_PRODUCT_ERROR",
    });
  }
}

/**
 * makes request to the backend for reviews on a product
 * @throws { UnexpectedErr } for internal server errors or request that could not be properly made
 * @throws { NotfoundErr } if productId does not exist
 * */
export async function getReviews(productId: string): Promise<GetReviewsResponse> {
  return {
    averageRating: 4.5,
    numberOfRatings: 1800,
    numberOfReviews: 10,
    sellerInfo: {
      image: "",
      name: "",
    },
    ratingInfo: [
      { ratingValue: 5, ratingCount: 200 },
      { ratingValue: 4, ratingCount: 600 },
      { ratingValue: 3, ratingCount: 200 },
      { ratingValue: 2, ratingCount: 300 },
      { ratingValue: 1, ratingCount: 500 },
    ],
    reviews: [
      {
        title: "Worth Every Penny",
        content: "It taste very good",
        timestamp: new Date(),
        rating: 3.5,
        username: "alibaba",
      },
      {
        title: "Worth Every Penny",
        content: "It taste very good",
        timestamp: new Date(),
        rating: 3.5,
        username: "alibaghghgghg",
      },
      {
        title:
          "Worth Every Penny afsf asd fsdfa dfas df asdfa sdfa sdf asdfa sdf asd fas df asd fasd fas fa sdf afs fas f asdfas dfa sdf asdf asd fas f",
        content:
          "It taste very good adfsdfasdf sdf asd fas df sd fa dsf as df a sdf fa sd fasdfajsidfjs dflajd;fjasd fsajlf;ajsdlfs;dljf;askdj;faslkdjf;asdkfja;sdkfj sdk fjasdfajsdf sljfjsladjfa sdfjaldfjsjdfalsjdfalksdjlafj sdf lasdfa dlf asjdlf jsald fjlasdjlfsd flasd jfls djflasdjflasd jfal sdlf jlasd fas adfkajsf;asjdf asdfjasdjf; asdklfjasdfj ;asldjf;asdjf ;asjfa;sldfsa; fksdjlfjsaj sdfjlas ldfj alksdlj fslkdjfas ldfj:",
        timestamp: new Date(),
        rating: 3.5,
        username: "alibaba",
      },
      {
        title: "Worth Every Penny",
        content: "It taste very good",
        timestamp: new Date(),
        rating: 3.5,
        username: "alibaba",
      },
    ],
  };
}

/**
 * Response type for getting a product
 **/
export type GetProductResponse = {
  name: string;
  price: string;
  numberOfReviews: number;
  rating: number;
  numberOfRatings: number;
  imageUrls: string[];
};

/**
 * Response type for getting reviews
 * */
type GetReviewsResponse = {
  averageRating: number;
  numberOfRatings: number;
  numberOfReviews: number;
  sellerInfo: {
    image: string;
    name: string;
  };
  ratingInfo: {
    ratingValue: number;
    ratingCount: number;
  }[];
  reviews: {
    title: string;
    content: string;
    timestamp: Date;
    rating: number;
    username: string;
  }[];
};
