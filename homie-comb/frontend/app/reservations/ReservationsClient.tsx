"use client";

import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "../components/EmptyState";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import {
  cancelReservation,
  setReservations,
} from "../redux/reducers/reservationsReducer";

const ReservationsClient = () => {
  const currentUser = useAppSelector((state) => state.user);
  const reservations = useAppSelector((state) => state.reservations);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const [deletingId, setDeletingId] = useState(0);

  useEffect(() => {
    if (currentUser?.username) {
      dispatch(setReservations(currentUser.username));
    }
  }, [currentUser, dispatch]);

  const onCancel = useCallback(
    async (id: number) => {
      setDeletingId(id);

      try {
        await dispatch(cancelReservation(id));
        toast.success("Reservation cancelled");
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setDeletingId(0);
      }
    },
    [dispatch, router],
  );

  if (!currentUser?.sub) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
