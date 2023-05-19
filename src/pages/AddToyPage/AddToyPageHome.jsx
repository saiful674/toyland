import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";


const AddToyPageHome = () => {
  const {user} = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    console.log(data)
    fetch('http://localhost:5000/add-toy', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.acknowledged) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your toy successfully added'
          })
          reset()
        }
      })

  };

  const subCategory = ['Stuffed Animals', 'Wildlife', 'Sea Creatures', 'Woodland Animals', 'Marsupials', 'Birds'];

  return (
    <div className="py-20 bg-[#f9fcff]">
      <div className="section-title mb-10 text-center lg:w-2/3 mx-auto">
        <h3 className="text-3xl font-bold mb-5">Add a Toy</h3>
        <p className="font-medium">Calling all toy enthusiasts! You can showcase and share your own delightful toy creations or unique finds. Whether you're a talented toy maker or have stumbled upon a hidden gem</p>
      </div>

      <div className="my-container grid md:grid-cols-2 gap-6 ">
        <div className="">
          <form className="border-2 border-[#12aee0] bg-white rounded-xl p-10" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input placeholder="Toy name" {...register("name", { required: true })} className='my-input' required />

            <div className="flex gap-5 mt-5">
              <input {...register("sellerName", { required: true })} className='my-input' defaultValue={user.displayName} placeholder="Seller name" required type="text" />
              <input {...register("sellerEmail", { required: true })} className='my-input' defaultValue={user.email} placeholder="Seller email" type="email" required />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <input {...register("availableQuantity", { required: true })} className='my-input' type="number" required placeholder="Available Quantity" />
              <input {...register("price", { required: true })} className='my-input' placeholder="Price" type="number" required />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <input {...register("rating", { required: true })} className='my-input' placeholder="Rating" type="text" required />

              <select {...register("subcategory")} required className='my-input'>
                <option defaultValue={'Select Category'}>Select Sub Category</option>
                {
                  subCategory.map((sub, index) =>
                    <option
                      key={index}
                      value={sub}> {sub}</option>
                  )
                }
              </select>
            </div>
            <input {...register("pictureURL", { required: true })} className='my-input mt-5' placeholder="Picture URL" type="url" required />

            <textarea {...register("description", { required: true })}
              className='mt-5 my-input' placeholder="Toy Description"></textarea>

            <input className="my-btn mt-5 w-full" type="submit" />
          </form>
        </div>
        <div className="flex items-center">
          <img src="https://img.freepik.com/free-vector/valentine-s-day-teddy-bear-concept-illustration_114360-4717.jpg?size=626&ext=jpg&ga=GA1.1.562300066.1684249269&semt=sph" alt="" className="object-contain w-full" />
        </div>
      </div>
    </div>
  );
};

export default AddToyPageHome;