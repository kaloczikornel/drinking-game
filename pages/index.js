import Head from 'next/head';
import { Button, Card, Chip, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Cancel from '@mui/icons-material/Cancel';
import styles from './footer.module.css';

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
const MONDATOK = [
    'Soha nem tettem úgy, hogy beteg vagyok, hogy elkerüljem az iskolába járást.',
    'Soha nem zaklattam soha egy osztálytársamat.',
    'Soha engem soha nem választottak utoljára egy csoportos projektnél.',
    'Soha nem dobtam soha iskolai kiránduláson.',
    'Soha nem kacérkodtam a tanárommal.',
    'Soha nem voltam prom.',
    'Soha nem esküdtem meg egy osztálytársamra.',
    'Soha nem loptam még soha egy osztálytársamtól.',
    'Soha nem énekeltem a zuhany alatt.',
    'Soha nem néztem még R kategóriájú filmet.',
    'Még soha nem gyakoroltam, hogyan csókoljak meg a párnám segítségével.',
    'Soha nem játszottam még soha Üvegezés.',
    'Soha nem találkoztam még valakivel.',
    'Soha nem játszottam még pókert.',
    'Soha nem csevegtem még soha egy idegennel online.',
    'Soha nem késtem még el az iskolából.',
    'Soha nem vettem gatyába gyereket.',
    'Soha nem fingtam soha egy osztálytársam előtt .',
    'Soha nem volt részmunkaidős munkám.',
    'Soha nem csaltam meg egy tesztet.',
    'Soha nem rejtettem el ételt az ágyam alatt.',
    'Soha nem buktam el és estem el egy összejövetel közepén.',
    'Soha nem csináltam még buta arcokat szüleimmel és tanáraimmal.',
    'Soha nem énekeltem még szerencsétlenül egy fürdőszobában.',
    'Soha nem táncoltam még tükör előtt.',
    'Soha nem húztam ki laza fogaimat, és nem mutattam meg másoknak.',
    'Soha nem gondoltam volna, hogy milyen macskának lenni.',
    'Soha nem estem még ki ágyból alvás közben.',
    'Soha nem loptam még el titokban pénzt apám zsebéből.',
    'Soha nem kölcsönöztem testvérem tollát kérés nélkül.',
    'Soha nem rajzoltam még mindig vicces rajzfilmet testvérem arcára, miközben ők aludtak.',
    'Soha nem hazudtam még szüleimnek arról, hogy a húgom hogyan húzta meg a hajam, amikor nem.',
    'Soha nem ettem még valamit, amíg az nem betegített meg.',
    'Soha nem voltam kórházban.',
    'Soha nem tanultam még meg úszni.',
    'Soha nem láttam még hulló csillagot.',
    'Soha nem hordtam még véletlenül össze nem illő zoknit.',
    'Soha nem volt még szörnyű frizurám.',
    'Soha nem törtem el csontot.',
    'Még soha nem mentem ki úgy, hogy ne hajaztam volna hajat.',
    'Soha nem aludtam kint részegen.',
    'Soha nem ittam whiskyt, mint a vizet.',
    'Soha nem voltam részeg, felhívtam valakit.',
    'Még soha nem mentem haza rossz házba ittas állapotban.',
    'Soha nem sportoltam ivás közben.',
    'Soha nem hibáztattam az ivást valamiért, amit mondtam.',
    'Soha nem volt még terhességi félelmem.',
    'Soha nem ittam még tömegközlekedéssel.',
    'Soha nem hagytam ki az ivást.',
    'Soha nem cseréltem ki soha az izzót egyedül.',
    'Soha nem estem át italozás miatt.',
    'Soha nem játszottam még ivó játékot.',
    'Soha nem nyitottam még egy palackot másik palackkal.',
    'Soha nem ittam egyedül.',
    'Soha nem voltam részeg, hogy bizalmat szerezzek.',
    'Soha nem ettem osztrigát.',
    'Soha nem csaltam be egy sört kevesebb, mint 10 másodperc alatt, majd pukiztam.',
    'Soha nem tettem még testlövést.',
    'Soha nem voltam sovány mártogatós.',
    'Soha nem szavaztam soha egy választáson.',
    'Soha nem voltam még tehetséges ékszer.',
    'Soha nem tettem házassági javaslatot.',
    'Soha nem tápláltam valakit kanállal.',
    'Még soha nem küldtem valakinek egy aranyos reggeli SMS-t.',
    'Soha nem próbáltam még soha a gyorskeresést.',
    'Soha nem kaptam még virágot valakitől, akivel randizom.',
    'Soha nem töltöttem még egy éjszakát valakivel a tengerparton.',
    'Soha nem voltam még hosszú úton olyan valakivel, akivel randizom.',
    'Soha nem csináltam még színházban.',
    'Soha nem vacsoráztam soha egy gyertyafényes romantikus vacsorán.',
    'Soha nem próbáltam ellopni a partnerem jelszavát.',
    'Soha nem zúztam össze barátom párját.',
    'Soha nem követtem valakit az Instagramon.',
    'Soha nem bántam meg, hogy valakivel randevúztam.',
    'Soha nem próbáltam elrejteni egy hickey-t.',
    'Soha nem beszéltem valakivel egész éjjel.',
    'Soha nem voltam soha barátom körzetében.',
    'Soha nem szakítottam valakit szöveggel.',
    'Soha nem csókoltam még valakit egy liftben.',
    'Soha nem küldtem valakinek szexi szelfit.',
    'Soha nem szedtem még az orrom.',
    'Soha nem törtem el soha a mobiltelefonomat.',
    'Soha nem léptem be valakihez a fürdőszobában.',
    'Még soha nem kaptam el, hogy a tükör előtt egyedülálló táncmulatságot tartottam.',
    'Soha nem tettem soha péksüteményeket a zsebembe szalvéta vagy takaró nélkül, miközben részeg voltam, mert később át akartam adni a testvéremnek.',
    'Soha nem hagytam részeg hangpostát.',
    'Soha nem küldtem még soha véletlenül rossz embernek szöveget.',
    'Még soha nem ütöttem falat és nem bántam meg, mert fájdalmas volt.',
    'Soha nem ettem még véletlenül kutyaeledelt.',
    'Soha nem villantottam valakit.',
    'Soha nem büszkélkedtem büszkén az ábécével.',
    'Soha nem nevettem még soha annyira, hogy bepisiltem magam.',
    'Soha nem választottam még soha nyilvános házasságot.',
    'Soha nem öltöztem valaha ellenkező nemnek.',
    'Soha nem állítottam be soha a gombjaimat a teremben tartózkodók alapján.',
    'Soha nem fingtam valakivel, aki tetszett.',
    'Soha nem ugrottam medencébe ruhával.',
    'Soha nem próbáltam még a holdfényt.',
    'Soha nem próbáltam lenyűgözni egy összetörést azzal, hogy látszott hozzáértőnek.',
    'Soha nem küldtem piszkos szöveget rossz embernek.',
    'Még soha nem repültem első osztályban.',
    'Soha nem tettem valakinek WC-vel papírokat Halloween idején.',
    'Még soha nem hajtottam botváltást.',
    'Soha nem használtam hamis személyi igazolványt.',
    'Soha nem voltam még cél esküvőn.',
    'Soha nem hagytam ki az ötösöt.',
    'Soha nem szereztem még ajándékot.',
    'Még soha nem mentem 24 órát zuhanyozás nélkül.',
    'Még soha nem küldtem vissza az ételt egy étterembe.',
    'Még soha nem mentettem meg valaki más életét.',
    'Még soha nem hazudtam a legjobb barátomnak arról, hogy kivel voltam.',
    'Soha nem voltam Disneyland-ben.',
    'Soha nem tettem úgy, hogy ismerek egy idegent, mert úgy éreztem, hogy valaki követ engem.',
    'Soha nem szerettem valamit, amit főztem.',
    'Soha nem volt pánikrohamom.',
    'Még soha nem kóstoltam kaviárt.',
    'Soha nem használtam még valaki más Netflix jelszavát.',
    'Még soha nem aludtam el az osztályban.',
    'Soha nem bocsátottak el soha.',
    'Soha nem néztem meg egy teljes televíziós sorozatot egy nap alatt.',
    'Soha nem csókoltam egynél több embert 24 óra alatt.',
    'Soha nem volt egyéjszakás állásom és reggeliztem.',
    'Még soha nem kellett volna szégyent járnom.',
    'Még soha nem táncoltam bárban.',
    'Még soha nem rúgtak ki egy kocsmából / klubból / bárból.',
    'Még soha nem léptem be a mérföldes klubba egy idegennel.',
    'Még soha nem aludtam el szex közben.',
    'Soha nem játszottam még szerepet ágyban.',
    'Soha nem jártam sztriptíz klubba.',
    'Soha nem tettem még konyhapulton.',
    'Soha nem feküdtem le azonos ikrekkel.',
    'Soha nem feküdtem le egy barátom partnerével.',
    'Soha nem nyeltem le a legelső szopást.',
    'Soha nem hazudtam valakinek a "számomról", akivel randizom.',
    'Soha nem voltam bilincsben.',
    'Soha nem hazudtam még egy csaló barát védelmében.',
    'Soha nem ébredtem rá, hogy valaki fejet ad nekem.',
    'Soha nem hajtottam végre „őrült ruhakeresést”, amikor valaki bekopogott az ajtón.',
    'Még soha nem csináltam barátom bátyjával.',
    'Soha nem készítettem még meztelen képet barátomról.',
    'Soha nem lettem még annyira másnapos, hogy megesküdtem, hogy soha többet nem iszom.',
    'Soha nem csókoltam valakit a nyilvánosság előtt.',
    'Soha nem volt még szerelmem veszekedése a nyilvánosság előtt.',
    'Soha nem hagytam ki az éttermi számlát.',
    'Soha nem nyertem a lottón.',
    'Soha nem kellett bírósághoz fordulnom.',
    'Soha nem estem össze esküvőt.',
    'Soha nem trolloltam valakit a közösségi médiában.',
    'Soha nem másztam ki az ablakon.',
    'Soha nem nevettem még soha annyira, hogy bepisiltem a nadrágomat.',
    'Soha nem próbáltam még dohányozni a marihuánával.',
    'Soha nem csináltam még tetoválást.',
    'Soha nem alkottam valaha hamis barátot / barátnőt.',
    'Soha nem tettem úgy, mintha beteg lennék, hogy az emberek odafigyeljenek rám.',
    'Soha nem költöttem 100 dollárnál többet pénztárcára.',
    'Soha nem dobtam valakinek egy italt.',
    'Soha nem hordtam még valaki más fehérneműt.',
    'Soha nem próbáltam még búvárkodni.',
    'Soha nem tartóztattak le soha, mert csatlakoztam egy tiltakozáshoz.',
    'Soha nem hagytam még megállás nélkül huszonnégy óránál tovább.',
];

const GAME_TYPES = {
    DEFAULT: 'Alap',
    NEVER_HAVE_I_EVER: 'Én még soha...',
};

const randomGenerator = (base) => {
    return Math.round(Math.random() * base.length);
};

export default function Home() {
    const [playerName, setPlayerName] = useState('');
    const [isGameOn, setIsGameOn] = useState(false);
    const [qNumber, setQNumber] = useState(0);
    const [players, setPlayers] = useState([]);
    const [actualPLayer, setActualPlayer] = useState(false);
    const [error, setError] = useState(false);
    const [gameData, setGameData] = useState(SENTENCES);
    const [typeOfGame, setTypeOfGame] = useState(GAME_TYPES.DEFAULT);

    const handleClick = () => {
        setQNumber(randomGenerator(gameData));
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

    useEffect(() => {
        switch (typeOfGame) {
            case GAME_TYPES.DEFAULT:
                setGameData(SENTENCES);
                break;
            case GAME_TYPES.NEVER_HAVE_I_EVER:
                setGameData(MONDATOK);
                break;
            default:
                setGameData(SENTENCES);
                break;
        }
    }, [typeOfGame, setGameData]);
    console.log(typeOfGame);
    return (
        <>
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
                        background: '#A5C9CA',
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
                                    <TextField
                                        value={typeOfGame}
                                        label="Típus"
                                        onChange={(e) => setTypeOfGame(e.target.value)}
                                        select
                                    >
                                        {Object.keys(GAME_TYPES).map((e) => {
                                            return (
                                                <MenuItem key={e} value={GAME_TYPES[e]}>
                                                    {GAME_TYPES[e]}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Grid>
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
                                            setPlayerName('');
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
                                    <Button
                                        disabled={playerName === ''}
                                        onClick={() => addPlayer(playerName)}
                                    >
                                        Hozzáad
                                    </Button>
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
                                                        margin: 3,
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
                                    <Card sx={{ padding: 2, background: '#2C3333' }}>
                                        <Typography
                                            variant="h4"
                                            margin={'auto'}
                                            color={'whitesmoke'}
                                        >
                                            Ivós játék haha
                                        </Typography>
                                    </Card>
                                    <Typography variant="h6" marginTop={5}>
                                        {`Te következel: ${actualPLayer}`}
                                    </Typography>
                                    <Typography variant="h6" marginTop={10}>
                                        {gameData[qNumber]}
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
            <footer className={styles.footer}>
                <a>Powered by ÉN</a>
            </footer>
        </>
    );
}
