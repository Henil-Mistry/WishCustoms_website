# WishCustoms_website
Customer side of a website where people may choose a desired pattern to apply on the base product or get a ai generated design based on the prompt given by the customer

#NOTE:
1.)Although some limited options are listed currently only the T-shirts section works for demonstration purposes other sections operate on similar structure hence were left out during making.
2.)This website is supposed to be a simulation and doesn't have proper facilities like an actual store's webpage so, even if options like payment and address are visible they do not redirect to third-party payment operators such as razorpay, paypal etc.
3.)This is merely the MVP of this project and was made during a 24-hour hackathon so some features may not feel upto the mark.
4.)Website's displayed pricing is only for demonstration and does not represent actual prices.
Consumers are supposed to pick a category from the give options, from where they are redirected to the customisation page. There either the consumer can upload an design they possess or get a AI generated design based on their prompt. Athough currently the "generate design"(prompt generated design) option currently only displays the text as it is entered by the user to demonstrate, since AI model API keys were not included due to the heavy time constraints of hackathon. Once user is done with their customisation the "add to cart" option redirects the customer to home page of the website. After reaching there they can check out via the shoppping cart option which is visible on the top-right side of the screen, where users are asked for deatils like address and payment method.
After successful order placement the placed order should be visible in the "orders" directory in the directory named "Ecom web" in a json file.
