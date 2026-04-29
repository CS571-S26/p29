import { Button, ButtonGroup, Form } from 'react-bootstrap'

export default function MoodSelector({ selectedMoods, setSelectedMoods, moods }) {
    function UpdateSelectedMoods(selected) {
        if (selected == null) {
        setSelectedMoods([]);
        return;
        }

        let newSelectedMoods = [...selectedMoods, selected];
        if (selectedMoods.includes(selected)) {
        newSelectedMoods = selectedMoods.filter(mood => mood !== selected);
        }

        setSelectedMoods(newSelectedMoods);
    }
    
    return (
        <Form>
            <div className='d-flex align-items-center gap-2'>
                <Form.Label className='mb-0 text-nowrap'>Filter by mood:</Form.Label>
                <ButtonGroup className="flex-wrap gap-2" aria-label="Mood filter">
                    {moods.map(mood => (
                    <Button
                        key={mood}
                        variant={selectedMoods.includes(mood) ? 'dark' : 'outline-dark'}
                        onClick={() => UpdateSelectedMoods(mood)}>
                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </Button>
                    ))}
                </ButtonGroup>
            </div>
        </Form>
    )
}