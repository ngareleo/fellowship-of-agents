These are figma links for the application we're building.

| UI                                                               | Figma                                                                                             |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Index page                                                       | https://www.figma.com/design/jEk4mVtNZbCMPtZzG2WwE8/Autocare?node-id=13-246&t=HKpzch0fSbKXRyyz-4  |
| Dashboard Page (After user clicks on see more in the index page) | https://www.figma.com/design/jEk4mVtNZbCMPtZzG2WwE8/Autocare?node-id=8-890&t=HKpzch0fSbKXRyyz-4   |
| Search page                                                      | https://www.figma.com/design/jEk4mVtNZbCMPtZzG2WwE8/Autocare?node-id=8-3183&t=HKpzch0fSbKXRyyz-4  |
| Car information page                                             | https://www.figma.com/design/jEk4mVtNZbCMPtZzG2WwE8/Autocare?node-id=8-1328&t=HKpzch0fSbKXRyyz-4  |
| Authentication Page                                              | https://www.figma.com/design/jEk4mVtNZbCMPtZzG2WwE8/Autocare?node-id=8-2111&t=HKpzch0fSbKXRyyz-4  |
| User Profile page for sellers                                    | https://www.figma.com/design/jEk4mVtNZbCMPtZzG2WwE8/Autocare?node-id=8-1787&t=HKpzch0fSbKXRyyz-4  |
| Seller Profile page from buyers POV                              | https://www.figma.com/design/jEk4mVtNZbCMPtZzG2WwE8/Autocare?node-id=13-489&t=HKpzch0fSbKXRyyz-4  |
| User Profile for buyers                                          | https://www.figma.com/design/jEk4mVtNZbCMPtZzG2WwE8/Autocare?node-id=13-831&t=HKpzch0fSbKXRyyz-4  |
| New listing page                                                 | https://www.figma.com/design/jEk4mVtNZbCMPtZzG2WwE8/Autocare?node-id=13-1057&t=HKpzch0fSbKXRyyz-4 |

## Implementation

I'd like the `@Lead-agent`  to analyse the slides and create issues for pages. We might have issues already existing for some of these pages. For those issues, we should update the issues with figma selection links. 

I'd like agents to think in terms of components. A design might have existing components so the agents should use the storybooks to see if there's an existing components before trying to re-implement a components. 

1. Let's create an issue for supporting `mdx` files to provide documentation and update that in our coding standards and skills.
2. We're going to use the playwright `mcp` to interact with storybooks. We should create a skill for inspecting storybooks.

After inspecting storybooks, agents can decide to  modify the components or create new ones.
Each new components or page should be covered in storybooks including any feature.
