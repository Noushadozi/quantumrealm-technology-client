import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary, {
    accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';


const FaqAccordion = () => {
    return (
        <AccordionGroup
            size='lg'
            sx={{
                maxWidth: 400,
                [`& .${accordionSummaryClasses.indicator}`]: {
                    transition: '0.2s',
                },
                [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
                    transform: 'rotate(45deg)',
                },
            }}
        >
            <Accordion className="bg-[white]">
                <AccordionSummary indicator={
                    <div className='bg-[#5bb286] flex items-center justify-center h-[35px] w-[35px] p-1 rounded-[35px]'>
                        <AddIcon className='text-white' />
                    </div>
                }>Do you provide ongoing support for your software products?</AccordionSummary>
                <AccordionDetails>
                    Absolutely. We offer comprehensive support and maintenance services to ensure the continued performance and security of our software products. Our dedicated support team is ready to assist you.
                </AccordionDetails>
            </Accordion>
            <Accordion className="bg-[white]">
                <AccordionSummary indicator={
                    <div className='bg-[#5bb286] flex items-center justify-center h-[35px] w-[35px] p-1 rounded-[35px]'>
                        <AddIcon className='text-white' />
                    </div>
                }>What industries does your software solutions cater to?</AccordionSummary>
                <AccordionDetails>
                    Our software solutions are versatile and cater to various industries such as healthcare, finance, logistics, education, hospitality, and more. We customize solutions to meet specific industry needs.
                </AccordionDetails>
            </Accordion>
            <Accordion className="bg-[white]">
                <AccordionSummary indicator={
                    <div className='bg-[#5bb286] flex items-center justify-center h-[35px] w-[35px] p-1 rounded-[35px]'>
                        <AddIcon className='text-white' />
                    </div>
                }>How do I stay updated on new releases and updates?</AccordionSummary>
                <AccordionDetails>
                    To stay informed about our latest releases, updates, and industry insights, you can subscribe to our newsletter on the website. We also regularly share updates on our social media channels.
                </AccordionDetails>
            </Accordion>
        </AccordionGroup>
    );
};

export default FaqAccordion;