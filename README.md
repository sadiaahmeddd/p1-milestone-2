# p1-milestone-2

IGME 430 – Project 1 Milestone
Sadia Ahmed
Project: Pokédex API

1. What dataset are you using?

I’m using a Pokédex JSON dataset that includes information about different Pokémon, such as their id, num, name, type, and weaknesses. The dataset includes nested arrays (like the type and weaknesses fields), which meets the project requirement for nested data. The file is loaded once when the server starts and then stored in memory for the API to use.

2. What work has been completed for this milestone?

For this milestone, I focused on building the core API functionality. The server: Loads the JSON dataset at startup.
Has four GET endpoints:
/api/pokemon
/api/pokemonById
/api/pokemonByNum
/api/types

3. What work is left, and how do you plan to complete it?

I still need to build the client-facing webpage and the separate API documentation page. I also need to add ESLint, set up GitHub Actions. My plan is to build the client interface next, then complete documentation and deployment before the final submission.

4. Do you have a plan for going above and beyond?
For above and beyond, I’m planning to improve the visual design of the client interface and possibly add more advanced filtering or search options to make the API easier to use.

5. Did you use any borrowed code?
I did look at copilot for some areas where I did get stuck and wasn't functioning but took ideas and guidelines but didn't copy paste 


6. What went right in the development of this project?

One major thing that went right was the overall API structure. I was able to correctly implement the required GET, HEAD, and POST endpoints and ensure that all status codes (200, 201, 204, 400, 404) were used appropriately. Loading the JSON file once at server startup and storing it in memory worked smoothly and improved performance.

Additionally, implementing server-side filtering using query parameters went well. The filtering logic for name, type, weakness, and limit functions correctly and demonstrates proper separation of concerns, since all filtering is handled by the API rather than the client.

7. One of the biggest challenges I faced was configuring GitHub Actions and ESLint correctly. Initially, my workflow would not run properly, and I encountered issues where pushes were not triggering CI. I also ran into errors related to repository configuration and accidentally committing the node_modules folder, which caused additional problems.

Setting up ESLint using the recommended ruleset was more difficult than expected. Some small syntax or structural issues caused lint failures, and it required careful debugging to ensure the code was completely free of ESLint errors. Learning how GitHub Actions integrates with ESLint through the workflow file took additional time, but ultimately helped me understand automated testing better.

I also encountered some environment issues, such as disk space errors and repository syncing problems, which required troubleshooting outside of just writing code.

8. What did you learn while developing this project?

Through this project, I gained a much stronger understanding of how HTTP servers work at a lower level using Node’s built-in http module rather than relying on frameworks like Express. I learned how to manually route requests, parse query parameters, process different content types in POST requests, and properly structure API responses.
I also developed a deeper understanding of HTTP status codes and why they are important in communicating server behavior. 

9. If you went above and beyond, how did you do so?

For above-and-beyond work, I expanded the filtering capabilities of the API to allow multiple query parameters to be used together in a single request. Users can combine name, type, weakness, and limit filters to create more precise searches.

I also built a functional client interface using the Fetch API that allows users to view, add, and edit Pokémon directly through the browser without writing code. The client correctly sends Accept and Content-Type headers and prevents default form submission behavior, making it function like a real web application.

Additionally, I organized my code into separate modules to maintain separation of concerns and improve readability.

10. I did not copy any complete external projects, but I did reference official documentation and occasionally used GitHub Copilot when I was stuck. When using Copilot, I mainly used it to help generate small snippets or suggest possible solutions, especially when working on body parsing logic or fixing ESLint errors. I always reviewed and adjusted the generated suggestions to make sure I fully understood what the code was doing and that it fit my project structure.

I also referenced the Node.js documentation to better understand how http.createServer() works and how to properly handle request and response streams. That structure is used in server.js. I used the official documentation for the URL class to parse request URLs and extract query parameters safely, which is also implemented in server.js.