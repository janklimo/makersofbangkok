export default (email, firstName) => {
  return `Hey, ===name===!
%0D%0A%0D%0A
Makers of Bangkok is an invitation-only network of people doing cool things
 in Bangkok. It's a colorful mix of entrepreneurs, programmers, artists,
 designers, photographers, event organizers, etc.
%0D%0A%0D%0A
Members organize small meetups of no more than 10 people every 2 weeks or so.
 It's an awesome opportunity to have meaningful conversations, bounce ideas
 off each other, and make some great connections with like-minded people.
%0D%0A%0D%0A
You can sign up using this link:%0D%0A
http://www.makersofbangkok.com/
%0D%0A%0D%0A
... and use my email ${email} to get verified. You'll get updates about
 all the upcoming events. Maybe see you on the next one?
%0D%0A%0D%0A
Best,
%0D%0A
${firstName}`;
};
