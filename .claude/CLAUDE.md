# Project Understanding.

It is important you go through the docs in `../docs/` directory to understand how to work within this project.

## 1. Project structure

We place all our documentation in `../docs/` directory.

### 1 a. Understanding documentation files

Each documentation file has a team-lead section and an agents section. The team-lead section starts with this comment `<!-- Start of team lead instructions  -->` and ends with this comment `<!--- End of team lead instructions -->`. This is where the team leader will place details about certain concepts in the project.

The agents section starts with this comment `<!--- Start of Claude and agents instructions -->` and ends with
`<!--- End of Claude and agents instructions -->`. This is where you can place related information that you think is important.

The team lead section is the main source of truth and has the main instructions which must upheld to the letter, even if some instructions might conflict with the agents section. The team-lead section is only updated by the team leader so avoid writing anything within this section.

### 1 b. Maintaining documentation.

The team leader controls the structure of the documentation. Its is part of your responsibility to maintain the agents section. This section is good to low level details about concepts that you think will help you in future as you work on this project. These details should NOT conflict with the team leaders information.
