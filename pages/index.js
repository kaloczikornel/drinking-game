import Head from 'next/head';
import { Button, Card, Chip, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Cancel from '@mui/icons-material/Cancel';

const SENTENCES = [
    'What’s your most shallow reason for not 2. What’s the worst date you’ve ever had? ',
    'What’s your worst habit? ',
    'Name something illegal that you’ve done and regret. ',
    'Tell about the biggest ticket you’ve ever gotten. ',
    'How many people in the room would you be willing to kiss? ',
    'What’s the weirdest dream you’ve ever had? ',
    'What do you wear when you’re hoping to go home with someone? ',
    'What kind of underwear do you wear? ',
    'What’s your dream first date? ',
    'What would make you immediately swipe right? ',
    'What would make you immediately swipe left? ',
    'Have you ever cheated or helped someone else cheat? ',
    'Have you ever gotten in a physical altercation with someone? ',
    'What’s your longest relationship? ',
    'Have you ever had a secret relationship? ',
    'Have you ever kissed anyone in this room? ',
    'What’s your favorite drink? ',
    'What’s the biggest lie you’ve ever told? ',
    'What do your current undergarments look like? ',
    'Would you ever hook-up with someone else’s partner? ',
    'Do you cover your eyes during the scary part of a movie? ',
    'If you suddenly became invisible, what would you do with your newfound transparency? ',
    'Have you ever wanted to try LARP (live-action role play)? ',
    'Who is your favorite family member? ',
    'What is the biggest secret you’ve kept from your parents when you were growing up? ',
    'Tell us about the last dream you can remember. Don’t leave any details out! ',
    'Have you ever lied about being sick so you could stay home from work or school? ',
    'Have you ever told someone you wouldn’t be home just so they wouldn’t come over to yours? ',
    'If anyone in your family could win an award for being the most annoying, who would it be? ',
    'Have you ever bought something to wear to an event, and then returned it to the store when the event was over? ',
    'Did you ever break up with someone just before a public holiday so that you didn’t have to buy them a gift? ',
    'What is your least favorite part about family gatherings? ',
    'What is your favorite movie that you secretly know is actually terrible? ',
    'Have you ever bribed or flirted with a police officer to get out of a ticket? ',
    'Do you have a bucket list? If so, what is one thing on that list? ',
    'What is the strangest thing you have ever bought? ',
    'Have you ever shared chewing gum with anyone? ',
    'Have you ever danced on a table when you were drunk? ',
    'What is the one thing you dislike about yourself? ',
    'What is the one thing you really like about yourself? ',
    'If you could hire someone to do one thing for you, what would it be? ',
    'What was the most embarrassing thing that you ever did while on a date? ',
    'What is your biggest pet peeve? ',
    'Would you ever blame someone else for your farts at the office? ',
    'What is your favorite feature on yourself? ',
    'What is the one mannerism you judge all potential partners on?',
    'What’s your “number?”',
    'What’s the shortest amount of time you’ve known someone before hooking up? ',
    'Where is the grossest place you’ve ever hooked up? ',
    'How far have you gone in public? ',
    'What’s the biggest age gap you’ve had with a partner? ',
    'What sex act are you best at? ',
    'What sex act are you bad at? ',
    'What’s your longest dry spell? ',
    'How many people in this room would you be willing to hook up with? ',
    'Who is the most inappropriate person you’ve ever had a crush on? ',
    'Tell us your most embarrassing vomit story. ',
    'Have you ever sexted? ',
    'What’s the dirtiest text you’ve ever received? ',
    'What’s your favorite position? ',
    'Top or bottom? ',
    'Have you ever been to a strip club? ',
    'Have you ever given a lap dance? ',
    'What conditions are necessary for hooking up on a first date? ',
    'What’s the hardest drug you’ve ever done? ',
    'What hook-up scene from a movie or TV show would you like to recreate? ',
    'How far are you willing to go with a cute stranger that you’ll never see again? ',
    'Would you sleep with a celebrity if you met them at a bar? What celebrity is a no-brainer? ',
    'If you could cheat and no one would ever, ever find out, would you? ',
    'If you could hack into your partner’s email and they’d never know, would you? ',
    'Have you ever read your bae’s texts over their shoulder? ',
    'If you could read all your partner’s texts with others, would you? ',
    'Do you secretly want the password for your bae’s phone? ',
    'If you had to choose between going naked or having your thoughts appear in thought bubbles above your head for everyone to read, which would you choose? ',
    'When was the last time you peed in bed? 30. Would you hook up with your high school crush today?',
    'What’s your most embarrassing fantasy?',
    'What kind of porn do you search for? ',
    'When watching porn, what makes you turn it off? ',
    'Have you ever joined a hook-up app or any app associated with risky behavior? ',
    'How many “toys” do you own? ',
    'What’s the best sex you’ve ever had? ',
    'What’s the weirdest 8. What’s the raunchiest dream you’ve ever had? ',
    'What’s the landscaping like “down there?” ',
    'What’s the dirtiest picture you’ve ever sent? ',
    'What’s the dirtiest text you’ve sent? ',
    'Have you ever hooked up with someone you didn’t know? ',
    'What’s the most outrageous thing you can remember doing while “under the influence?” ',
    'What is something “scandalous” and sex-related that you really want to try? ',
    'Are you more dominant or submissive? ',
    'If you were a sex worker, how much would each sex act cost? ',
    'Have you ever asked for a dirty pic? ',
    'How do you initiate sex with your partner? ',
    'Would you ever 20. How likely are you to ever consider being a stripper? What about a porn star? ',
    'What’s the soonest you’ve ever had sex with someone after meeting them? ',
    'If you were going to write an erotic novel, what would it be about? ',
    'What was the last thing you masturbated to? ',
    'If you could have sex with one person in this room, who would it be? ',
    'What’s your magic number now, and what do you wish it was? ',
    'What’s the weirdest thing that’s ever turned you on? ',
    'Which sexual act are you best at? ',
    'How many sex toys do you own? ',
    'How many orgasms have you faked? ',
    'What is your biggest sexual regret? ',
    'What’s the dirtiest sext you’ve ever sent? ',
    'Who’s the most scandalous person you’ve had sex with? ',
    'Have you ever slept with someone you met online? ',
    'Have you ever been caught masturbating? ',
    'What do you like to be called in bed? ',
    'What movie always turns you on? ',
    'What’s your favorite body part on a girl? ',
    'Describe the most embarrassing time you got turned on. ',
    'Have you ever thought about sleeping with the same sex? ',
    'What is your strangest off-limits crush? ',
    'If you got to have a threesome with people in this room, who would you do it with and why? ',
    'Where is the weirdest place that you’ve ever masturbated? ',
    'Describe your “I’m getting laid tonight” outfit? ',
    'Have you ever slept with someone from work? ',
    'What is more thrilling, makeup or angry sex? ',
    'How many times a week do you touch yourself? ',
    'Have you ever done IT at work? ',
    'Do you like telling your partner what to do in bed, or do you prefer to be told what to do? ',
    'Have you ever walked in on your parents doing it? ',
    'Have you ever thought of someone else while you were sleeping with someone? ',
    'Describe your crush’s personality. ',
    'Do you find your friend’s sibling attractive? ',
    'If given the chance, would you sleep with your boss? ',
    'Have you ever farted while spooning with someone? ',
    'Have you ever done a striptease for someone?',
    'What was the last thing you searched for on your phone?',
    'Have you ever tasted a booger? ',
    'What’s the first thing you would do if you woke up one day as the opposite sex? ',
    'Who do you think is the worst dressed person in this room? ',
    'What are some things you think about when sitting on the toilet? ',
    'Have you ever practiced kissing in a mirror? ',
    'Have you ever had a wardrobe malfunction? ',
    'Do you pick your nose? ',
    'You’re in a public restroom and just went number two, then you realized your stall has no toilet paper. What do you do? ',
    'Where’s your favorite place to fart in public? ',
    'What’s the strangest thing someone would find in your web search history? ',
    'Do you ever talk on the phone while you’re taking a poop? ',
    'What color undergarments do you have on right now? ',
    'If you lost one day of your life every time you said a swear word, would you stop? ',
    'If someone offered you $1 million to break up with your current partner, would you? ',
    'After you’ve dropped a piece of food, what’s the longest time you’ve left it on the ground and then ate it?',
    'Have you ever eaten while on the toilet? ',
    'Have you ever farted around the office and blamed it on someone else? ',
    'Have you ever farted on an airplane? ',
    'Has anyone besides you and your partner found your 21. What do most people think is true about you but isn’t? ',
    'If you could trade places with anyone for a day, who would it be? ',
    'What’s the most childish thing you still do? ',
    'Do you ever talk to yourself in the mirror? ',
    'Do you think you’ll marry your current girlfriend/boyfriend? ',
    'What’s the most embarrassing thing you’ve done drunk? ',
    'Have your parents ever walked in on you doing it?',
];

const randomGenerator = () => {
    return Math.round(Math.random() * SENTENCES.length);
};

export default function Home() {
    const [playerName, setPlayerName] = useState('');
    const [isGameOn, setIsGameOn] = useState(false);
    const [qNumber, setQNumber] = useState(0);
    const [players, setPlayers] = useState([]);
    const [actualPLayer, setActualPlayer] = useState(false);
    const [error, setError] = useState(false);

    const handleClick = () => {
        setQNumber(randomGenerator());
        setActualPlayer((prevState) => {
            if (!actualPLayer) {
                return players[0];
            } else {
                let index = players.findIndex((e) => e === actualPLayer);
                if (index < players.length - 1) {
                    index++;
                } else {
                    index = 0;
                }
                return players[index];
            }
        });
    };

    const addPlayer = (name) => {
        if (!players.includes(name)) {
            setPlayers((prevState) => [...prevState, name]);
        } else {
            setError('Egyedi név szükséges!');
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    };
    return (
        <div className="container">
            <Head>
                <title>Drinking Game by Kornél</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Paper
                    elevation={8}
                    sx={{
                        maxHeight: 900,
                        maxWidth: 600,
                        margin: 'auto',
                        padding: 8,
                        marginTop: 10,
                    }}
                >
                    <Grid
                        container
                        spacing={3}
                        direction={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        {!isGameOn && (
                            <>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Adj hozzá játékosokat!</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Játékos neve"
                                        type="text"
                                        color="primary"
                                        focused
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        onFocus={(e) => {
                                            e.target.value = '';
                                        }}
                                    ></TextField>
                                </Grid>
                                {error && (
                                    <Grid item xs={12}>
                                        <Typography variant={'subtitle2'} color={'red'}>
                                            {error}
                                        </Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Button onClick={() => addPlayer(playerName)}>Hozzáad</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        spacing={2}
                                        direction={'row'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                    >
                                        {players.map((player) => {
                                            return (
                                                <Grid
                                                    item
                                                    xs={2}
                                                    key={player}
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        margin: 2,
                                                    }}
                                                    justifyContent={'center'}
                                                >
                                                    <Typography varianx t="subheading">
                                                        <Chip
                                                            label={player}
                                                            onDelete={(e) => {
                                                                e.preventDefault();
                                                                setPlayers((prevState) =>
                                                                    prevState.filter(
                                                                        (e) => e !== player
                                                                    )
                                                                );
                                                            }}
                                                            deleteIcon={<Cancel />}
                                                        />
                                                    </Typography>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        disabled={!(players.length > 0)}
                                        onClick={() => {
                                            setIsGameOn(true);
                                            setActualPlayer(players[0]);
                                        }}
                                    >
                                        JÁTÉK
                                    </Button>
                                </Grid>
                            </>
                        )}
                        {isGameOn && (
                            <div
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick();
                                }}
                            >
                                <Grid item xs={12}>
                                    <Card sx={{ padding: 2 }}>
                                        <Typography variant="h4" margin={'auto'}>
                                            Ivós játék haha
                                        </Typography>
                                    </Card>
                                    <Typography variant="h6" marginTop={5}>
                                        {`Te következel: ${actualPLayer}`}
                                    </Typography>
                                    <Typography variant="h6" marginTop={10}>
                                        {SENTENCES[qNumber]}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} marginTop={10}>
                                    <Button
                                        onClick={() => {
                                            setIsGameOn(false);
                                            setPlayerName('');
                                        }}
                                        fullWidth
                                    >
                                        Előről
                                    </Button>
                                </Grid>
                            </div>
                        )}
                    </Grid>
                </Paper>
            </main>
            <footer>
                <a>Powered by ÉN</a>
            </footer>
        </div>
    );
}
