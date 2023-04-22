import { FC, useState, useEffect } from 'react';
import { de } from 'date-fns/locale';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { ReadPet } from '../../../api-client/pet';
import { HttpError as HttpErrorPartial } from '../../partial/http-error';
import { PetResponse } from '../../../model/model';
import { HttpError } from '../../../api-client/error';

const Read: FC = () => {
  const params = useParams();
  const id = params.id as string;

  const [pet, setPet] = useState<PetResponse>();
  const [httpError, setHttpError] = useState<HttpError>();

  const fetchPet = async () => {
    const response = await ReadPet(id);

    if (response instanceof HttpError) {
      setHttpError(response);
    } else {
      setHttpError(undefined);
      setPet(response);
    }
  };

  useEffect(() => {
    document.title = 'Read Pet';

    fetchPet();
  }, [id]);

  if (!pet && !httpError) {
    return <div></div>;
  }

  return (
    <div data-testid="page-pet-read">
      {httpError ? <HttpErrorPartial httpError={httpError} /> : null}
      <h1>Read Pet</h1>
      {pet ? (
        <div>
          <dl>
            <dt>Id</dt>
            <dd>{pet.id}</dd>
            <dt>CreatedAt</dt>
            <dd>{format(Date.parse(pet.createdAt), 'dd.MM.yyyy - HH:mm:ss', { locale: de })}</dd>
            <dt>UpdatedAt</dt>
            <dd>{pet.updatedAt && format(Date.parse(pet.updatedAt), 'dd.MM.yyyy - HH:mm:ss', { locale: de })}</dd>
            <dt>Name</dt>
            <dd>{pet.name}</dd>
            <dt>Tag</dt>
            <dd>{pet.tag}</dd>
            <dt>Vaccinations</dt>
            <dd>
              {pet.vaccinations ? (
                <ul>
                  {pet.vaccinations.map((vaccination, i) => (
                    <li key={i}>{vaccination.name}</li>
                  ))}
                </ul>
              ) : null}
            </dd>
          </dl>
          <Link to="/pet" className="btn-gray">
            List
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Read;