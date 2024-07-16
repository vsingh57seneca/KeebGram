import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import KeyboardCarousel from '../../components/keyboard/KeyboardCarousel';
import DesignPreview from '../../components/editor/DesignPreview';
import { useAtom } from 'jotai';
import { userAtom } from '../../../store';
import { getDesignsByUserId, deleteDesign } from '../../functions/Designs';

const index = () => {
    const router = useRouter();
    const [user, setUser] = useAtom(userAtom);
    const [designs, setDesigns] = useState([]);
    const [selectedDesign, setSelectedDesign] = useState(null);

    useEffect(() => {
        if (!user) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser) {
                setUser(storedUser);
            }
        }
    }, []);

    useEffect(() => {
        if (user && user.account_id) {
            getDesignsByUserId(user.account_id)
                .then(data => {
                    if (data && data.length > 0) {
                        setDesigns(data);
                        setSelectedDesign(data[0]);
                    } else {
                        console.log('No designs found or an error occurred.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching designs: ', error);
                });
        }
    }, [user]);

    const handleSelect = (design) => {
        setSelectedDesign(design);
    };

    const handleDelete = async (designId) => {
        const response = await deleteDesign(designId);
        if (response && response.status === 200) {
            const updatedDesigns = designs.filter(design => design.design_id !== designId);
            setDesigns(updatedDesigns);
            if (updatedDesigns.length > 0) {
                setSelectedDesign(updatedDesigns[0]);
            } else {
                setSelectedDesign(null);
            }
            alert("Design deleted successfully!");
        } else {
            alert("Failed to delete design.");
        }
    };
    

    const handleEdit = (design) => {
        router.push({
            pathname: '/editor/create',
            query: { design: JSON.stringify(design) }
        });
    };

    return (
        <div>
            <button className='btn btn-sm btn-success text-white mt-4 ml-4' onClick={() => router.push('/editor/create')}>Create</button>

            {selectedDesign && (
                <DesignPreview
                    design={selectedDesign}
                    onEdit={() => handleEdit(selectedDesign)}
                    onDelete={() => handleDelete(selectedDesign.design_id)}
                />
            )}

            <div className='slider-container mt-4 mx-4 block w-0 min-w-full'>
                <h1>Your designs ({designs.length})</h1>
                <KeyboardCarousel designs={designs} onSelect={handleSelect} />
            </div>
        </div>
    );
}

export default index;
